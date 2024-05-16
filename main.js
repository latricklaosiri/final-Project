import { Bird } from './src/bird.js';
var brd = new Bird('Blue');

function setup(amount) {
    const birds = []
    for (var i = 0; i < amount; i++) {
        birds.push(new Bird("blue"));
        birds.push(new Bird("red"));
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

function contest(array) {
    let otherArray = []

    array = shuffle(array)

    for (let i = array.length-1; i >= 0; i-=2) {
        // pair up random birds to contest
        const [a,b] = array.splice(0,2);
        //console.log(a.strategy);
        a.match(b);
        console.log(a);
        console.log(b);
        otherArray.push(a,b);
        console.log(otherArray);
    }

    // generate next generation
    return otherArray;
    
  }; 

function main() {
    let birds = []
    birds = setup(5);
    /*
    console.log(birds);
    console.log(birds.length);
    for (let i = birds.length - 1; i > 0; i--) { 
        console.log(birds[i].strategy); 
        console.log(birds[i].value);
      }
    */
      
    birds = contest(birds);
    
}

main();