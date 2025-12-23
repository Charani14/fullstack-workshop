function findPrimes() {
    let limit = parseInt(prompt("Enter the upper limit to find prime numbers:"));
    let primes = [];

    for (let num = 2; num <= limit; num++) {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(num);
        }
    }

    alert(`Prime numbers up to ${limit} are: ${primes.join(", ")}`);    
    console.log(`Prime numbers up to ${limit} are: ${primes.join(", ")}`);
}