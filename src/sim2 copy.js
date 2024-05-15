const { Bird } = require('./bird');

function setup(amount) {
    const birds = ["1","2","3","4"]
    const iterator = birds.keys();
    return birds;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
      } 
      return array;
}

function main() {
    let birds = setup();
    birds = shuffle(birds)
    console.log(birds);
}

main();