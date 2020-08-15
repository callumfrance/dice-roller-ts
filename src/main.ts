import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Die } from './Die';
import { DiceGroup } from './DiceGroup';
import { DiceSet } from './DiceSet';

const app = document.getElementById('app');

const q = new DiceSet().diceSet1();
q.diceGroups[0].pushDie(new Die(4));
q.pushDie(new Die(4));
var result = q.rollSet();
console.log(String(result[0] + ': ' + String(result[1])));

app.appendChild(q.getHTML());

const cardTest = document.createElement('div');
cardTest.setAttribute('class', 'card');

const cardTitle = document.createElement('div');
cardTitle.setAttribute('class', 'card-title');
cardTitle.innerText = 'Card Title';

const cardText = document.createElement('div');
cardText.setAttribute('class', 'card-text');
cardText.innerText = 'Card Text';

cardTest.appendChild(cardTitle);
cardTest.appendChild(cardText);

app.appendChild(cardTest);
