export class Bird {
    constructor(strategy) {
        this.strategy = strategy;
        this.value = 0;
    }
    match(opponent) {
        this.value = 0;
        opponent.value = 0;
        if (this.strategy == "red" && opponent.strategy == "red") {
            opponent.value += .75;
            this.value += .75;
        }

        if (this.strategy == "blue" && opponent.strategy == "blue") {
            opponent.value += 1;
            this.value += 1;
        }

        if (this.strategy == "blue" && opponent.strategy == "red") {
            opponent.value += 1.75
            this.value += .25
        } 

        if (this.strategy == "red" && opponent.strategy == "blue") {
            opponent.value += .25
            this.value += 1.75
        } 
    }
    toString() {
        return "Bird " + this.strategy;
    }

}