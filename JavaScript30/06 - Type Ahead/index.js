const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const cities = []

fetch(endpoint).then(response => {
    if (response.status === 200) {
        return response.json();
    } else {
        throw new Error(`Something went wrong.`);
    }
}).then(data => {
    cities.push(...data);
}).catch(error => {
    throw new Error(`${error}`);
});

const findMatches = (wordToMatch, cities) => {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi')
        return place.city.match(regex) || place.state.match(regex);
    });
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const displayMatches = (e) => {
    const value = e.target.value;
    const matchArray = findMatches(value, cities);
    let html = '';
    if (value !== '') {
        html = matchArray.map(place => {
            const regex = new RegExp(value, 'gi');
            const cityName = place.city.replace(regex, `<span class="hl">${value}</span>`);
            const stateName = place.state.replace(regex, `<span class="hl">${value}</span>`);
            return `
                <li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${numberWithCommas(place.population)}</span>
                </li>
            `;
        }).join('');
    } else {
        html = `
            <li>Filter for a city</li>
            <li>or a state</li>
        `
    }

    suggestions.innerHTML = html;
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);