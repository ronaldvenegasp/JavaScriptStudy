const getTip = amount => {
    if (typeof amount !== 'number') {
        throw Error('Argument must be a number');
    }
    return amount * 0.25;
};

try {
    const result = getTip(true);
    console.log(result);
} catch (error) {
    console.log(error.message);
    throw Error('', { cause: error });
}

