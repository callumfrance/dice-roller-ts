import { DiceSet } from './DiceSet';

const app = document.getElementById('app');
const rollHTML = document.createElement('div');

const q = new DiceSet().diceSet1();
var result = q.rollSet();
console.log(String(result[0] + ': ' + String(result[1])));

rollHTML.innerHTML = (`<h1 id="total">` + String(result[0]) + `</h1>` +
    `<h4 id="single_rolls">` + String(result[1]) + `</h4>`);

app.appendChild(rollHTML);
