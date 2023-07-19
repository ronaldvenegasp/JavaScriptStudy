const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

function makeGreen() {
    const p = document.querySelector('p');
    p.style.color = '#BADA55';
    p.style.fontSize = '50px';
}

// Regular
console.log('hello');

// Interpolated
console.log('Hello, I am a %s string!', 'line');

// Styled
console.log('%cI am some great text', 'font-size: 15px; background: red; text-shadow: 10px 5px 0 blue');

// warning!
console.warn('Ohhh NOOOO!');

// Error :|
console.error('Shit!');

// Info
console.info('Cocodriles eat 3-4 people per year');

// Testing
console.assert(1 === 1, "That's wrong!");
const p = document.querySelector('p');
console.assert(p.classList.contains('ouch'), "Class not configured");

// clearing
console.clear();

// Viewing DOM Elements
console.log(p);
console.dir(p);
console.clear();

// Grouping together
dogs.forEach(dog => {
    console.group(`${dog.name}`);
    console.log(`This is ${dog.name}`);
    console.log(`${dog.name} is ${dog.age} years old`);
    console.log(`${dog.name} is ${dog.age * 7} dog years old`);
    console.groupEnd(`${dog.name}`);
})

// counting
console.count('Wes');
console.count('Wes');
console.count('Steve');
console.count('Steve');
console.count('Wes');
console.count('Wes');

// timing
console.time('Fetching data');
fetch('https://api.github.com/users/wesbos')
    .then(data => data.json())
    .then(data => {
        console.timeEnd('Fetching data');
        console.log(data);
    });

// table
console.table(dogs);