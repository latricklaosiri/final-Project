export class Bird {
    //Simple Constructor
    constructor(strategy) {
        this.strategy = strategy;
        this.value = 0;
    }

    //Match against opponent - will optimize later, also add repeated interactions (If have time?)
    match(opponent) {
        this.value = 0;
        opponent.value = 0;
        if (this.strategy == "red" && opponent.strategy == "red") {
            opponent.value += .25;
            this.value += .25;
        }

        if (this.strategy == "blue" && opponent.strategy == "blue") {
            opponent.value += 1.25;
            this.value += 1.25;
        }

        if (this.strategy == "blue" && opponent.strategy == "red") {
            opponent.value += 1.5
            this.value += .5
        } 

        if (this.strategy == "red" && opponent.strategy == "blue") {
            opponent.value += .5
            this.value += 1.5
        } 
    }
    //Default
    add() {
        this.value += 2;
    }
    
    toString() {
        return "Strategy: " + this.strategy + " Value: " + this.value;
    }

}