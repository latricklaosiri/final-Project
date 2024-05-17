import { Bird } from './src/bird.js';

export class HConsole {
    constructor() {
        this.html = document.getElementById('console');
    }

    log(s) {
        // this.html.innerText += s + "\n";
    }
}

//Carrying Capacity of Trees for birds
let cc = 20;
//Test Variables
let reds = 0;
let blues = 0;
let h_console = new HConsole();

//Setup function for number of each bird
function setup(blues, reds, purples, yellows) {
    let birds = []
    for (var i = 0; i < blues; i++) {
        birds.push(new Bird("blue"));
    }
    for (var i = 0; i < reds; i++) {
        birds.push(new Bird("red"));
    }
    for (var i = 0; i < purples; i++) {
        birds.push(new Bird("purple"));
    }
    for (var i = 0; i < yellows; i++) {
        birds.push(new Bird("yellow"));
    }
    return birds;
}

//Randomize Birds
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Handles How birds reproduce
function contest(array) {
    let otherArray = [];

    array = shuffle(array);

    //If bird count < carrying capacity (number of trees) = Each bird gets own tree
    if (array.length <= cc) {
        h_console.log("Default 1");


        for (let i = 0; i < array.length; ++i) {
            let a = array[i];
            a.add();
            otherArray.push(a);

        }
        for (let b = 0; b < array.length; ++b) {
            h_console.log("Default 1: " + otherArray[b]);
        }
        return otherArray;

    }
    //If bird count < cc * 2 = There are only some birds that get their own trees - not all
    else if (array.length < cc * 2) {
        h_console.log("Default 2");


        for (let i = 0; i < cc * 2 - array.length; ++i) {
            let a = array[i];
            a.add();
            otherArray.push(a);

        }
        for (let b = 0; b < otherArray.length; ++b) {
            h_console.log("Default 2: " + otherArray[b]);
        }

        //Leads from earlier case - Handles normal bird Competition
        for (let i = array.length - 1; i >= 0; i -= 2) {

            if (i != 0) {
                // pair up random birds to contest
                const [a, b] = array.splice(0, 2);
                //h_console.log(a.strategy);
                a.match(b);
                otherArray.push(a, b);
            } else {
                let a = (array[0]);
                otherArray.push(a);
            }
        }
        // generate next generation
        return otherArray;
        /*
        
        */

    }
    else {
        h_console.log("Normal Comp");
        let overC = false; let checkC = 0;
        for (let i = array.length - 1; i >= 0; i -= 1) {


            // pair up random birds to contest
            if (checkC >= cc * 2) { h_console.log("CC Hit"); return otherArray; }
            checkC += 2;
            const [a, b] = array.splice(0, 2);
            //h_console.log(a.strategy);
            a.match(b);
            otherArray.push(a, b);
            debugger;



        }
        //Also leads from earlier case - Handles normal bird Competition while accounting for carrying capacity

    }
};

//Handles bird reproduction based on value the bird has
function reproduce(array) {
    let otherArray = []
    //Check value of each bird
    for (let i = 0; i < array.length; i++) {
        if (array[i].value >= 1) {
            //Reproduce based on value
            //For each whole number, add one, with percentage based on rest of decimal
            let temp = array[i];
            const rnd = Math.random() * 100000;
            const percent = rnd / 1000;

            otherArray.push(new Bird(temp.strategy));

            if (percent > 100 - ((temp.value - 1) * 100)) {
                otherArray.push(new Bird(temp.strategy));
            }

        } else {
            //Else, if less than one, reproduce based on that percentage
            let temp = array[i];
            const rnd = Math.random() * 100000;
            const percent = rnd / 1000;

            if (percent > 100 - ((temp.value - 1) * 100)) {
                otherArray.push(new Bird(temp.strategy));
            }
        }
    }
    return (otherArray);
}

function main() {
    let birds = []
    birds = setup(19, 1, 0, 0);
    for (let i = 0; i < 10; ++i) {
        reds = 0; blues = 0;
        h_console.log("trial: " + i);
        birds = contest(birds);
        for (let b = 0; b < birds.length; ++b) {
            h_console.log("Contest: " + birds[b]);
            //Values should be sent from here
        }
        birds = reproduce(birds);

        for (let b = 0; b < birds.length; ++b) {
            h_console.log("Reproduce: " + birds[b]);
            if (birds[b].strategy == "red") { ++reds; }
            if (birds[b].strategy == "blue") { ++blues; }
        }
        h_console.log("#Reds: " + reds + " #Blues: " + blues);
    }
}

window.onload = function () {

    var dataPoints1 = [];
    var dataPoints2 = [];

    var chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,
        title: {
            text: "Growth of the Red Pigeon"
        },
        axisX: {
            title: "chart updates every 3 secs"
        },
        axisY: {
            prefix: "$"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 22,
            fontColor: "dimGrey",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "$####.00",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: "Blue Birds",
            dataPoints: dataPoints1
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "$####.00",
            showInLegend: true,
            name: "Red Birds",
            dataPoints: dataPoints2
        }]
    });

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }

    var updateInterval = 1000;
    // initial value
    var yValue1 = 10;
    var yValue2 = 10;

    var time = new Date;
    // starting at 9.30 am
    time.setHours(9);
    time.setMinutes(30);
    time.setSeconds(0o0);
    time.setMilliseconds(0o0);


    function updateChart(count) {
        count = count || 1;
        let birds = [];
        birds = setup(10, 10, 0, 0);


        dataLength = 5;
        var deltaY1, deltaY2;
        for (var i = 0; i < count; i++) {
            reds = 0; blues = 0;
            birds = contest(birds);
            birds = reproduce(birds);

            for (let b = 0; b < birds.length; ++b) {
                h_console.log("Reproduce: " + birds[b]);
                if (birds[b].strategy == "red") { ++reds; }
                if (birds[b].strategy == "blue") { ++blues; }
            }

            time.setTime(time.getTime() + updateInterval);

            // adding random value and rounding it to two digits. 
            yValue1 = reds;
            yValue2 = blues;

            // pushing the new values
            dataPoints1.push({
                x: time.getTime(),
                y: yValue1
            });
            dataPoints2.push({
                x: time.getTime(),
                y: yValue2
            });
        }

        if (dataPoints1.length > dataLength) {
            dataPoints1.shift();
            dataPoints2.shift();
        }
        h_console.log("Hello");
        // updating legend text with  updated with y Value 
        chart.options.data[0].legendText = " Blue Bird Count " + reds;
        chart.options.data[1].legendText = " Red Bird Count  " + blues;
        chart.render();
        /*
        count = count || 1;
        dataLength = 5;
        var deltaY1, deltaY2;
        for (var i = 0; i < count; i++) {
            time.setTime(time.getTime() + updateInterval);
            deltaY1 = .5 + Math.random() * (-.5 - .5);
            deltaY2 = .5 + Math.random() * (-.5 - .5);

            // adding random value and rounding it to two digits. 
            yValue1 = Math.round((yValue1 + deltaY1) * 100) / 100;
            yValue2 = Math.round((yValue2 + deltaY2) * 100) / 100;

            // pushing the new values
            dataPoints1.push({
                x: time.getTime(),
                y: yValue1
            });
            dataPoints2.push({
                x: time.getTime(),
                y: yValue2
            });
        }

        if (dataPoints1.length > dataLength) {
            dataPoints1.shift();
            dataPoints2.shift();
        }
        h_console.log(dataPoints1);
        // updating legend text with  updated with y Value 
        chart.options.data[0].legendText = " Blue Bird  Count " + yValue1;
        chart.options.data[1].legendText = " Red Bird Count  " + yValue2;
        chart.render();
    }
    */
    }
    // generates first set of dataPoints 
    updateChart(1);
    setInterval(function () { updateChart() }, updateInterval);



}
//TO IMPLEMENT - Link to Graph
main();