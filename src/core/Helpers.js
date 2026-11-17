const getRandomFromArray = (list) => {
    return list[Math.floor((Math.random() * list.length))];
}

const toRadians = (angle) => {
    return angle * (Math.PI / 180);
}

const randomRangeFloat = (min, max) => { return Math.random() * (max - min) + min; };

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {
    getRandomFromArray, 
    toRadians,
    randomRangeFloat,
    getRandomInt
}