// Create a curry function that allows partial application
const curry = (fn) => {
    // Return a curried version of fn
    return function curried(...args) {
        // If the number of arguments is sufficient, call the original function
        if (args.length >= fn.length) {
            return fn(...args);
        } else {
            // Otherwise, return a function that collects more arguments
            return function(...moreArgs) {
                return curried(...args, ...moreArgs);
            };
        }
    };
};

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(5));     
console.log(curriedAdd(1, 2)(8));    
console.log(curriedAdd(1)(2, 9));   
console.log(curriedAdd(1, 2, 6));    