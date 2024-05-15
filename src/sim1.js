// Import necessary modules (assuming they are available or implemented similarly in JavaScript)
const { Bird } = require('./bird');
const { randomInt, sampleSize, shuffle } = require('lodash');
const fs = require('fs');
const { parse } = require('json2csv');
const { createCanvas } = require('canvas');
const Chart = require('chart.js');

function initialise() {
    /**
     * Create a population of birds - all dove to begin
     */
    const birds = [];

    for (let i = 0; i < 1000; i++) {
        birds.push(new Bird("dove"));
    }

    return birds;
}

function timestep(birds, value, cost) {
    /**
     * Pair up the birds, make them compete
     * Then produce next generation, weighted by fitness
     */
    const nextGeneration = [];

    shuffle(birds);

    for (let i = 0; i < 1000; i++) {
        // pair up random birds to contest
        const [a, b] = sampleSize(birds, 2);
        a.contest(b, value, cost);
    }

    // generate next generation
    const fitnesses = birds.map(bird => bird.fitness);
    const draw = sampleSize(birds, 1000, { weights: fitnesses });
    draw.forEach(bird => {
        nextGeneration.push(bird.spawn());
    });

    return nextGeneration;
}

async function main() {
    let birds = initialise();
    const rows = [];

    const V = 4, C = 6;

    for (let i = 0; i < 1000; i++) {
        // add the counts to a new row
        const strategy = birds.map(bird => bird.strategy);
        const nHawks = strategy.filter(s => s === "hawk").length;
        const nDoves = strategy.filter(s => s === "dove").length;
        const row = { n_hawks: nHawks, n_doves: nDoves };
        rows.push(row);

        // run the timestep function
        birds = timestep(birds, V, C);
    }

    // create CSV and save output
    const csv = parse(rows);
    fs.writeFileSync('simulation.csv', csv);

    // create chart and save output
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: rows.map((_, i) => i),
            datasets: [
                {
                    label: 'n_hawks',
                    data: rows.map(row => row.n_hawks),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false
                },
                {
                    label: 'n_doves',
                    data: rows.map(row => row.n_doves),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const buffer = canvas.toBuffer('application/pdf');
    fs.writeFileSync('simulation.pdf', buffer);
}

main();
