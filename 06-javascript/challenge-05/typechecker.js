const typeOf = (value) => {
    // Return accurate type for any value
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (Number.isNaN(value)) return 'nan';

    const type = typeof value;

    if (type === 'object') {
        if (Array.isArray(value)) return 'array';
        if (value instanceof Date) return 'date';
        if (value instanceof Map) return 'map';
        if (value instanceof Set) return 'set';
        if (value instanceof RegExp) return 'regexp';
        if (value instanceof Error) return 'error';
        if (value instanceof Promise) return 'promise';
        return 'object';
    }

    return type;    
};

const testValues = [
    null,
    undefined,
    42,
    NaN,
    'hello',
    true,
    Symbol(),
    [],
    {},
    () => {},
    new Date(),
    new Map(),
    new Set(),
    /regex/,
    new Error(),
    Promise.resolve()
];

testValues.forEach(val => {
    console.log(`typeOf(${val instanceof Object ? val.constructor.name : val}): "${typeOf(val)}"`);
});
// Expected Output:
// typeOf(null): "null"
// typeOf(undefined): "undefined"
// typeOf(42): "number"
// typeOf(nan): "nan"
// typeOf(hello): "string"
// typeOf(true): "boolean"
// typeOf(Symbol()): "symbol"
// typeOf(Array): "array"
// typeOf(Object): "object"
// typeOf(Function): "function"
// typeOf(Date): "date"
// typeOf(Map): "map"
// typeOf(Set): "set"
// typeOf(RegExp): "regexp"
// typeOf(Error): "error"
// typeOf(Promise): "promise"   