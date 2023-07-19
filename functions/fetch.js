fetch('https://puzzle.mead.io/puzzle', {}).then((response) => {
    if (response.status === 200) {
        return response.json();
    } else {
        throw new Error('Unable to fetch the puzzle');
    }
}).then((data => {
    console.log(`Puzzle: ${data.puzzle}`);
})).catch((error) => {
    console.error(`Error: ${error}`);
});