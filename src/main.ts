import { DiceSet } from './DiceSet';

const q = new DiceSet().diceSet1();
var result = q.rollSet();
console.log(String(result[0] + ': ' + String(result[1])));
