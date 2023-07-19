// const getPuzzle = (wordCount) => new Promise((resolve, reject) => {
//     // Making a HTTP request
//     const request = new XMLHttpRequest();
//     request.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) {
//             const data = JSON.parse(e.target.responseText);
//             resolve(data.puzzle);
//         } else if (e.target.readyState === 4) {
//             reject("An error has taken place");
//         }
//     });
//     request.open('GET', `https://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
//     request.send();
// });

// const getPuzzle = (wordCount) => {
//     return fetch(`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`, {}).then((response) => {
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             throw new Error('Unable to fetch the puzzle');
//         }
//     }).then((data) => {
//         return data.puzzle;
//     });
// }

const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`, {});
    if (response.status === 200) {
        const data = await response.json();
        return data.puzzle;
    } else {
        throw new Error('Unable to fetch the puzzle');
    }
}

// const getCountry = (countryCode) => new Promise((resolve, reject) => {
//     // Making a country request
//     const countryRequest = new XMLHttpRequest();
//     countryRequest.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) {
//             const data = JSON.parse(e.target.responseText);
//             const country = data.find(element => element.cca2 === countryCode);
//             resolve(country);
//         } else if (e.target.readyState === 4) {
//             reject('Unable to fetch the data.');
//         }
//     });
//     countryRequest.open('GET', 'https://restcountries.com/v3.1/all');
//     countryRequest.send();
// });

// const getCountry = (countryCode) => {
//     return fetch('https://restcountries.com/v3.1/all', {}).then((response) => {
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             throw new Error('Unable to fetch the data.');
//         }
//     }).then((data) => data.find(element => element.cca2 === countryCode));
// }

const getCountry = async (countryCode) => {
    const response = await fetch('//restcountries.com/v3.1/all', {});
    if (response.status === 200) {
        const data = await response.json();
        const country = data.find(element => element.cca2 === countryCode);
        return country;
    } else {
        throw new Error('Unable to fetch the data.');
    }
}

// const getLocation = () => {
//     return fetch('http://ipinfo.io/json?token=0542e27b27237a', {}).then((response) => {
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             throw new Error('Unable to fetch the location.');
//         }
//     });
// }

const getLocation = async () => {
    const response = await fetch('//ipinfo.io/json?token=0542e27b27237a', {});
    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Unable to fetch the location.');
    }
}
