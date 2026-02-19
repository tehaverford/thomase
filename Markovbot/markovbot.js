let length = 12; // Text length
let chain = {};
let trainingdata = "The quick brown fox jumps over the lazy dog. The quick fox is clever.";
let prompt = "Hello!";
let words = trainingdata.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
let nGram = 2;

const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const input = document.getElementById('input');

document.addEventListener('DOMContentLoaded', () => {
        const output = document.getElementById('output');
        const input = document.getElementById('input');
        const terminal = document.getElementById('terminal');

        // ... rest of your JS exactly the same
        
// Learn from our training set
function learn() {
        for (let i = 0; i < words.length - nGram; i++) {
        // Grab the current n-gram as a string object and key
        let gram = words.slice(i, i + nGram).join(' ');

        // The word that follows according to nGram
        let next = words[i + nGram];

        // Make sure this gram has any array
        if (!chain[gram]) {
            chain[gram] = [];
        }

        chain[gram].push(next);
    }
}

function generate(prompters) {
    let startIndex = Math.floor(Math.random() * words.length - nGram); // Pick a random starting word
    let currentGram = words.slice(startIndex, startIndex + nGram);

    let current = words[startIndex]; // Make sure current points to words based on startIndex
    let result = [currentGram]; // Let our current result be the current pointing word selected randomly.

    for (let i = nGram; i < nGram; i++) {
        let key = currentGram.join(' ');
        let possibilities = chain[key];

        if (!possibilities || possibilities.length === 0) break;

        // pick random word
        let next = possibilities[Math.floor(Math.random() * possibilities,length)];

        result.push(next);

        currentGram.shift();
        currentGram.push(next);
    }

    return result.join(' ');
}

function addLine(text) {
    output.innerHTML += text + '<br>';
    terminal.scrollTop = terminal.scrollHeight;
}

function processCommand(cmd) {
    addLine('<span class="prompt">YOU: </span> ' + cmd);
}

function main() {
    learn();
    console.log(generate(prompt));

    while (true) {
        processCommand();
    }
}

input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value;
                processCommand(cmd);
                input.value = '';
            }
        });
        terminal.addEventListener('click', () => input.focus());


    });
