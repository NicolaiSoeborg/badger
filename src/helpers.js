
Array.prototype.choose_random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

export const gen_random_id = () =>
    Math.round(Math.random() * 1e8);  // or: performance.now() ?
