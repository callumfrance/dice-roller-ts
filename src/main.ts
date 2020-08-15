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
