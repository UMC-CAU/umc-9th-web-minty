import { useEffect, useMemo, useRef, useState } from "react";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

const MAX_RETRIES =3;

const RETRY_DELAY = 1000;

interface CacheEntry<T> {
  data: T;
  lastFetched: number;
}


export const useCustomFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [isError, setIsError] = useState(false);

    const storageKey = useMemo(() : string => url, [url]);

    const abortController = useRef<AbortController | null>(null);

    const retryTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        abortController.current = new AbortController();
        setIsError(false);

        const fetchData = async (currentRetry = 0) : Promise<void> => {
            const currentTime = new Date().getTime();
            const cachedItem = localStorage.getItem(storageKey);

            if (cachedItem) {
                try {
                    const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

                    if (currentTime - cachedData.lastFetched < STALE_TIME) {
                        setData(cachedData.data);
                        setIsPending(false);
                        console.log('Cache사용');
                        return;
                    }
                    setData(cachedData.data);
                    console.log('Cache만료');
                } catch (error) {
                    localStorage.removeItem(storageKey);
                    console.warn('Cache삭제');
                }
            }

            setIsPending(true);
            try {
                const response = await fetch(url, {
                    signal: abortController.current?.signal,
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch data`);
                }

                const newData = await response.json() as T;
                setData(newData);

                const newCacheEntry: CacheEntry<T> = {
                    data: newData,
                    lastFetched: new Date().getTime(),
                };
                localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
                console.log('Cache업데이트');
            } catch (error) {

                if (error instanceof Error && error.name === 'AbortError') {
                    console.log('요청 취소됨', url);
                    return;
                }

                if (currentRetry < MAX_RETRIES) {
                    const retryDelay = RETRY_DELAY * Math.pow(2, currentRetry);
                    console.log(
                        `재시도 ${currentRetry + 1}/${MAX_RETRIES} Retrying ${retryDelay}ms later`
                    );
                    retryTimeoutRef.current = setTimeout(() : void => {
                        fetchData(currentRetry + 1);
                    }, retryDelay);
                } else {
                    console.error(error);
                    setError(error as Error);
                    setIsError(true);
                }
            } finally {
                setIsPending(false);
            }
        };
        fetchData();
        return () => {
            abortController.current?.abort();
            if (retryTimeoutRef.current !== null) {
                clearTimeout(retryTimeoutRef.current);
                retryTimeoutRef.current = null;
            }
        };
    }, [url, storageKey]);

    return { data, isPending, error, isError };
};