import { useRef, useEffect, useCallback } from 'react';

function useThrottle<T extends any[]>(
    callback: (...args: T) => void,
    delay: number,
    dependencies: any[] = []
) {
    const lastRun = useRef(Date.now());
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const callbackRef = useRef(callback);
    const argsRef = useRef<T | null>(null);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = null;
            }
        };
    }, []);

    const throttledCallback = useCallback((...args: T) => {
        const now = Date.now();
        const timeElapsed = now - lastRun.current;

        argsRef.current = args;

        if (timeElapsed >= delay) {
            callbackRef.current(...args);
            lastRun.current = now;
        } else {
            if (timer.current) {
                return;
            }
            timer.current = setTimeout(() => {
                if (argsRef.current) {
                    callbackRef.current(...argsRef.current);
                }
                lastRun.current = Date.now();
                timer.current = null;
            }, delay - timeElapsed);
        }
    }, [delay, ...dependencies]);

    return throttledCallback;
}

export default useThrottle;
