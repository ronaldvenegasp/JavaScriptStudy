const myFunction = () => {
    const message = "This is my message";
    const printMessage = () => {
        console.log(message);
    }
    return printMessage;
}
const myPrintMessage = myFunction();
myPrintMessage();

// Private variable in JS
const createCounter = () => {
    let count = 0;
    return {
        increment() {
            count++;
        },
        decrement() {
            count--;
        },
        get() {
            return count;
        }
    }
}
const counter = createCounter();
counter.increment();
counter.decrement();
counter.decrement();
console.log(counter.get());

// Adder
const createAdder = (a) => {
    return (b) => {
        return a + b;
    }
}
const add10 = createAdder(10);
console.log(add10(-2));
console.log(add10(20));

// Tipper
const createTipper = (tip) => {
    return (amount) => {
        return amount * tip;
    }
}
const tip15 = createTipper(.15);
const tip20 = createTipper(.2);
const tip25 = createTipper(.25);
console.log(`Tip (15%) value: ${tip15(125)} USD`);
console.log(`Tip (20%) value: ${tip20(125)} USD`);
console.log(`Tip (25%) value: ${tip25(125)} USD`);