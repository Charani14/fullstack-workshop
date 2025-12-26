function createRateLimiter(fn, limit, interval) {
    // Return a function that can only be called 'limit' times per 'interval' ms
    // Returns false if rate limit exceeded
    let callTimes = [];

    return function(...args) {
        const now = Date.now();

        // Remove timestamps that are older than the interval
        callTimes = callTimes.filter(time => now - time < interval);

        if (callTimes.length < limit) {
            callTimes.push(now);
            fn(...args);
            return true; // Indicate that the function was called
        } else {
            return false; // Rate limit exceeded
        }
    };  
}

const limitedFetch = createRateLimiter(
    (url) => console.log('Fetching:', url),
    3,  // 3 calls
    1000 // per second
);

console.log(limitedFetch('api-1')); // "Fetching: api-1", true
console.log(limitedFetch('api-2')); // "Fetching: api-2", true
console.log(limitedFetch('api-3')); // "Fetching: api-3", true
console.log(limitedFetch('api-4')); // false (rate limited)

// After 1 second, calls work again