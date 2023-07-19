// Arrow function
const square_nomal = (number) => {
    return number * number;
}
console.log(square_nomal(5));

// Arrow function shorthand syntax
const square_shorthand = number => number * number;
console.log(square_shorthand(5));

const people = [
    { name: 'Andrew', age: 27 },
    { name: 'Vikram', age: 31 },
    { name: 'Jess', age: 22 }
];

const under30 = people.filter(function (person) {
    return person.age < 30;
});
console.log(under30);

const under30arrow = people.filter(person => person.age < 30);
console.log(under30arrow);

const person = people.find(person => person.age === 22);
if (person) console.log(person);