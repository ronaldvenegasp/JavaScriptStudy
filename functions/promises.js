// Using callbacks
const getDataCallback = (num, callback) => {
    setTimeout(() => {
        if (typeof num === 'number') {
            callback(undefined, num * 2);
        } else {
            callback('Number must be provided');
        }
    }, 2000);
}

getDataCallback(2, (error, data) => {
    if (error) {
        console.error(error);
    } else {
        getDataCallback(data, (error, data) => {
            if (error) {
                console.error(error);
            } else {
                console.log(data);
            }
        });
    }
});

// Using Promises
const getDataPromise = (num) => new Promise((resolve, reject) => {
    setTimeout(() => {
        typeof num === 'number' ? resolve(num * 2) : reject('Number must be provided');
    }, 2000);
});

getDataPromise(2).then((data) => {
    getDataPromise(data).then((data) => {
        console.log(`Promise data: ${data}`)
    }, (err) => {
        console.log(err)
    })
}, (err) => {
    console.log(err)
})

getDataPromise(10).then((response) => {
    return getDataPromise(response);
}).then((response) => {
    return getDataPromise(response);
}).then((response) => {
    console.log(`Promise response: ${response}`);
}).catch((error) => {
    console.error(`Error: ${error}`);
});
