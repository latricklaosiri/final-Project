export class Bird {
    constructor(strategy) {
        this.strategy = strategy;
        this.value = 0;
    }
    match(opponent) {
        this.value = 0;
        if (self.strategy == "red" && opponent.strategy == "red") {
            opponent.value += .75;
            self.value += .75;
        }

        if (self.strategy == "blue" && opponent.strategy == "blue") {
            opponent.value += 1;
            self.value += 1;
        }

        if (self.strategy == "red" && opponent.strategy == "red") {
            opponent.value += 1.75
            self.value += .25
        } 
    }
    toString() {
        return "Bird " + this.strategy;
    }

}