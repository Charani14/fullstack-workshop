// compose: right to left
const compose = (...fns) => { 
    return fns.reduce((f, g) => x => f(g(x)));
};

// pipe: left to right
const pipe = (...fns) => { 
    return fns.reduce((f, g) => x => g(f(x)));
};

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composed = compose(addOne, double, square);
const input1 = 7;
const result1 = composed(input1);
console.log(`${result1}`); // Expected: 99
const piped = pipe(square, double, addOne);
const input2 = 3;
const result2 = piped(input2);
console.log(`${result2}`); // Expected: 19
