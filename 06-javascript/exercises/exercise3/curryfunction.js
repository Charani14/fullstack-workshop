// Create a curry function that allows partial application
const curry = (fn) => {
    // Return a curried version of fn
    const curried = (...args) => {
        if (args.length >= fn.length) {
            return fn(...args);
        } else {
            return (...moreArgs) => curried(...args.concat(moreArgs));
        }
    };
    return curried;
};

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

// Helper to format arguments nicely with template literals and array methods
const formatArgs = (...args) => args.map(arg => `${arg}`).join(', ');

console.log(`${curriedAdd(1)(2)(5)}`);
console.log(`${curriedAdd(1, 2)(8)}`);
console.log(`${curriedAdd(1)(2, 9)}`);
console.log(`${curriedAdd(1, 2, 6)}`);