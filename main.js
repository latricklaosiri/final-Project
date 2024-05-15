import { Bird } from './src/bird.js';
var brd = new Bird('Blue');

function setup(amount) {
    const birds = []
    for (var i = 0; i < amount; i++) {
        birds.push(new Bird("blue"));
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

    for (let i = 0; i < birds.length; i++) {
        // pair up random birds to contest
        const [a, b] = sampleSize(birds, 2);
        a.contest(b, value, cost);
    }

    // generate next generation
    const draw = sampleSize(birds, 1000, { weights: fitnesses });
    return draw.map(bird => bird.spawn());
    
  }; 

function main() {
    let birds = setup(5);
    birds = shuffle(birds);
    console.log(birds.length);
    console.log(birds);
    birds = shuffle()
}

main();