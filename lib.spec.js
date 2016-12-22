describe('basics', () => {
    it('map example', () => {
        const people = [
            {name: 'justin', age: 30},
            {name: 'bob', age: 30},
            {name: 'piknik', age: 12},
            {name: 'jay', age: 11.75},
        ];

        const expected = [
            [ 'justin', 30 ],
            [ 'bob', 30 ],
            [ 'piknik', 12 ],
            [ 'jay', 11.75 ],
        ];

        const actual = people.map(
            (iteration, index, collection) => {
                return [iteration.name, iteration.age];
            }
        );

        expect(expected).toEqual(actual);
    });

    it('filter example', () => {
        const people = [
            {name: 'justin', age: 30},
            {name: 'bob', age: 30},
            {name: 'piknik', age: 12},
            {name: 'jay', age: 11.75},
        ];

        const expected = [
            {name: 'justin', age: 30},
            {name: 'bob', age: 30}
        ];

        const actual = people.filter(
            (iteration, index, collection) => {
                return iteration.age >= 30;
            }
        );

        expect(expected).toEqual(actual);
    });

    it('sum numbers', () => {
        const answer = sum([1,2,3]);
        expect(answer).toEqual(6);
    });

    it('sum numbers', () => {
        const answer = reduce(
            [1,2,3],
            (sum, iteration) => sum + iteration,
            0
        );

        expect(answer).toEqual(6);
    });
});

describe('map', () => {
    it('maps values', () => {
        const people = [
            {name: 'justin', age: 30},
            {name: 'bob', age: 30},
            {name: 'piknik', age: 12},
            {name: 'jay', age: 11.75},
        ];

        const expected = [
            [ 'justin', 30 ],
            [ 'bob', 30 ],
            [ 'piknik', 12 ],
            [ 'jay', 11.75 ],
        ];

        const actual = map(
            people,
            x => ([x.name, x.age])
        )

        expect(actual).toEqual(expected);
    });
})

describe('filter', () => {
    it('filters values', () => {
        const people = [
            {fname: 'justin', lname: 'obney', age: 30},
            {fname: 'bob', lname: 'johnson', age: 30},
            {fname: 'piknik', lname: 'table', age: 12},
            {fname: 'jay', lname: 'z', age: 11.75},
        ];

        const expected = [
            {fname: 'justin', lname: 'obney', age: 30},
            {fname: 'bob', lname: 'johnson', age: 30},
        ];

        const actual = filter(
            people,
            x => x.age >= 30
        );

        expect(actual).toEqual(expected);
    });
})

describe('useful things', () => {
    it('flattens arrays', () => {
        const answer = flatten(
            [
                [1,2],
                [3,4],
            ]
        );

        expect(answer).toEqual([1,2,3,4]);
    });

    it('convert array to dictionary lookup', () => {
        const people = [
            {name: 'justin', age: 30},
            {name: 'bob', age: 30},
            {name: 'piknik', age: 12},
            {name: 'jay', age: 11.75},
        ];

        const expected = {
            30: [
                {name: 'justin', age: 30},
                {name: 'bob', age: 30}
            ],
            12: [{name: 'piknik', age: 12}],
            [11.75]: [{name: 'jay', age: 11.75}],
        }

        const answer = reduce(
            people,
            (agg, person) => {
                if(!agg[person.age]){
                    agg[person.age] = [];
                }
                agg[person.age].push(person)
                return agg;
            },
            {}
        );

        expect(answer).toEqual(expected);
    });
})

describe('advanced: compose', () => {
    it('complex function', () => {
        const person = {
            name: 'Justin Obney',
            phd: true,
            md: true,
            gender: 1
        }

        const expected = 'Hello, Mr. Justin Obney Phd';
        const actual = complexGreeting(person);
        expect(expected).toEqual(actual);
    });

    it('tiny functions', () => {
        expect(greeting('Justin')).toEqual('Hello, Justin');
        expect(mr('Justin')).toEqual('Mr. Justin');
        expect(mrs('Justin')).toEqual('Mrs. Justin');
        expect(md('Justin')).toEqual('Justin M.D.');
        expect(phd('Justin')).toEqual('Justin Phd');
    });

    it('compose functions', () => {
        const person = {
            name: 'Justin Obney',
            phd: true,
            md: true,
            gender: 1
        }

        const composed = compose(
            person.gender == 1 ? mr : mrs,
            greeting,
            person.phd
                ? phd
                : person.md
                    ? md
                    : identity
        );

        const expected = 'Hello, Mr. Justin Obney Phd';
        expect(composed(person.name)).toEqual(expected);
    });
})
