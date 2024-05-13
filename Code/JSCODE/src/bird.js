var self = this
class birdObject {
    function initialize(self, strategy) {
        self.strategy = strategy
        self.value = 10
    }
    function contest(self, opponent) {
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
            self.value += .24
        } 

    }
    function create (self) {
        
    }
    update() {}
    eat() {}
    findNest() {}
    reset() {}
    clone() {}
}
