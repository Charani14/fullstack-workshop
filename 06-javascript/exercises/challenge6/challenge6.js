// Create a function that composes multiple functions
const compose = (...functions) => {
    // Return a function that applies all functions right-to-left
    return function(initialValue) {
        return functions.reduceRight((accumulator, currentFunction) => {
            return currentFunction(accumulator);
        }, initialValue);
};
};

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composed = compose(addOne, double, square);
console.log(composed(3)); // addOne(double(square(3))) = addOne(double(9)) = addOne(18) = 19
