var br = require('./bird.js');
console.log(br)

const brd = new br.BirdObject('Blue');

function setup(amount) {
    const birds = []
    for (i = 0; i < amount; i++) {
        birds.push(new BirdObject("blue"));
    }
    return birds;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
      } 
      return array;
}

function match(birds) {
    otherArray = []

    shuffle(birds)

  }; 

function main() {
    let birds = setup(5);
    birds = shuffle(birds);
    console.log(birds.length);
    console.log(birds);
}

main();