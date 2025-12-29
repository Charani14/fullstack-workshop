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
console.log(composed(7)); // addOne(double(square(7))) = addOne(double(49)) = addOne(98) = 99

const piped = pipe(square, double, addOne);
console.log(piped(3)); // addOne(double(square(3))) = 19