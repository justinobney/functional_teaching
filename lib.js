'use strict';

// map: n => n
// filter: n => <=n
// reduce: n => 1

/**
 * Turns an array of values into a single value
 * n => 1
 * @param {array} array - The values to reduce into a single value.
 * @param {callback} accumulatorFunction - called for each item in the array
 *            - given:
 *                - accumulatedValue
 *                - currentArrayItem
 *                - currentArrayIndex
 *                - array
 *            - should return accumulatedValue;
 * @param {callback} starting value
 *            - will be accumulatedValue in first iteration of loop.
 */

const sum = (numbers) => {
    let sum = 0;
    for (var i = 0; i < numbers.length; i++) {
        sum = sum + numbers[i]
    }

    return sum;
}

const reduce = (collection, aggregatorFn, startingValue) => {
    let aggregation = startingValue;

    for (var i = 0; i < collection.length; i++) {
        aggregation = aggregatorFn( aggregation, collection[i], i, collection );
    }

    return aggregation;
}

const map = (collection, mappingFn) => reduce(
    collection,
    (agg, val) => {
        agg.push(mappingFn(val))
        return agg
    },
    []
);

const filter = (collection, filterFn) => reduce(
    collection,
    (agg, val) => {
        if(filterFn(val)){
            agg.push(val)
        }
        return agg
    },
    []
);

const flatten = (collection) => reduce(
    collection,
    (agg, val) => agg.concat(val),
    []
)

const complexGreeting = (person) => {
    const base = 'Hello,';
    const greeting = person.gender === 0 ? 'Mrs.' : 'Mr.' ;
    const suffix = person.phd
        ? 'Phd'
        : person.md
            ? 'M.D.'
            : '';

    return `${base} ${greeting} ${person.name} ${suffix}`;
}

const greeting = (name) => `Hello, ${name}`;
const mr = (name) => `Mr. ${name}`;
const mrs = (name) => `Mrs. ${name}`;
const md = (name) => `${name} M.D.`;
const phd = (name) => `${name} Phd`;

const identity = x => x;

const compose = (...fns) => x => reduce(
    fns,
    (agg, fn) => fn(agg),
    x
)
