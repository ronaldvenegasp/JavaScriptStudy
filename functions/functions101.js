let convertFahrenheitToCelsius = function (fahrenheit) {
  let celsius = (fahrenheit - 32) * (5 / 9);
  return celsius;
}

let temp1 = convertFahrenheitToCelsius(32);
console.log(temp1);

let temp2 = convertFahrenheitToCelsius(68);
console.log(temp2);