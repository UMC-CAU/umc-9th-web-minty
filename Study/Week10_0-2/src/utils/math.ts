
export const findPrimes = (max: number) => {
    const sieve = new Array(max + 1).fill(true);

    sieve[0] = false;
    sieve[1] = false;

    for (let i = 2; i * i <= max; i++) {
        if (sieve[i]) {

            for (let j = i * i; j <= max; j += i) {
                sieve[j] = false;
            }
        }
    }

    return sieve
        .map((isPrime, index) => (isPrime ? index : null))
        .filter((n) => n !== null) as number[];
};
