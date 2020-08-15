/**
 * A class for containing a group of Dice which have the same number of sides.
 * A modifier value is placed here which can be added to the total roll once.
 */

import { Die } from './Die';

export class DiceGroup {
    public diceType: number;
    public dice: Array<Die>;
    public modifier: number;
    public lastRolls?: number;

    public constructor(
        diceType: number,
        dice?: Array<Die>,
        modifier: number = 0,
    ) {
        this.diceType = diceType;
        this.dice = new Array<Die>();
        this.modifier = modifier;

        if (dice) {
            dice.forEach( (element) => {
                this.pushDie(element);
            });
        }
    }

    /**
     * Adds a Die to the final position of the Dice array
     */
    public pushDie(inDice: Die): void;
    public pushDie(inDice: Array<Die>): void;
    public pushDie(inDice: any) {
        if (inDice instanceof Array) {
            inDice.forEach( (element) => {
                this.pushDie(element);
            });
        } else {
            if (inDice.sides === this.diceType) {
                this.dice.push(inDice);
            } else {
                console.log('Cannot add Die of sides ' + String(inDice.sides) +
                    ' to DiceGroup of sides ' + String(this.diceType));
            }
        }
    }

    /**
     * Removes a Die from the first element of the Dice array
     */
    public shiftDie(): Die | null {
        return(this.dice.shift() || null);
    }

    /**
     * Rolls all Dice in the DiceGroup, returning a tuple of the
     *  result as well as the individual dice and their results.
     */
    public rollGroup(): [number, Array<number>, Array<Die>] {
        let total: number = this.modifier;
        let rolls: Array<number> = [];

        this.dice.forEach( (element) => {
            let lastRoll: number = element.roll();
            total += lastRoll;
            rolls.push(lastRoll);
        });

        this.lastRolls = total;
        return([total, rolls, this.dice]);
    }

    /**
     * Returns a generated HTMLElement based on the DiceGroup object values.
     */
    public getHTML(): HTMLElement {
        let dgHTML = document.createElement('div');
        dgHTML.setAttribute('class', 'DiceGroup DiceGroup' + String(this.diceType));
        dgHTML.style.border = '2px solid CadetBlue';
        dgHTML.style.background = 'DarkGoldenRod';
        dgHTML.innerText = 'd' + String(this.diceType) + ' Rolls: ' +
            ((typeof this.lastRolls === 'undefined' ) ?
                '-' : String(this.lastRolls));

        let dgPlus = document.createElement('button');
        dgPlus.addEventListener('click', (e: Event) => {
                this.pushDie(new Die(this.diceType));
                dgHTML.appendChild(this.dice[this.dice.length - 1].getHTML());
            });
        dgPlus.innerText = 'Plus <<+>>';

        // let dgMinus = document.createElement('button');
        // dgMinus.addEventListener('click', (e: Event) => {
        //     this.shiftDie();
        //     dgHTML.removeChild(dgHTML.childNodes[0]);
        // });
        // dgMinus.innerText = 'Minus <<->>';

        dgHTML.appendChild(dgPlus);
        // dgHTML.appendChild(dgMinus);

        this.dice.forEach( (die) => {
            dgHTML.appendChild(die.getHTML());
        });

        let modifierHTML = document.createElement('div');
        modifierHTML.setAttribute('class', 'DiceGroupModifier');
        modifierHTML.innerText = 'Mod ' + String(this.modifier);
        dgHTML.appendChild(modifierHTML);
        modifierHTML.style.background = 'GoldenRod';

        return(dgHTML);
    }
}
