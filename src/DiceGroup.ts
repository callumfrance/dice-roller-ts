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
        let dgHTML       = document.createElement('div');
        let dgHead       = document.createElement('h3');
        let dgDice       = this.getDiceHTML();
        let dgDiceManip  = document.createElement('div');
        let [dgPlus, dgMinus] = this.getDiceManip(dgDice);

        dgHTML.setAttribute('class',
            'card p-2 m-2 DiceGroup DiceGroup' + String(this.diceType));

        dgHead.setAttribute('class', 'card-title');
        dgHead.innerText = 'd' + String(this.diceType) + ' Rolls: ' +
            ((typeof this.lastRolls === 'undefined' ) ?
                '-' : String(this.lastRolls))
            + ' (+' + String(this.modifier) + ')';
        dgHTML.appendChild(dgHead);

        dgDiceManip.setAttribute('class', 'col-2 m-3 card dgDiceManip');
        dgDiceManip.style.height = '70px';

        dgDiceManip.appendChild(dgPlus);
        dgDiceManip.appendChild(dgMinus);
        dgDice.appendChild(dgDiceManip);

        dgHTML.appendChild(dgDice);

        return(dgHTML);
    }

    /**
     * Generates the HTMElements of all the DiceGroup's Dice.
     * This is used inside the `getHTML()` public function.
     */
    private getDiceHTML(): HTMLElement {
        let dgDice = document.createElement('div');

        dgDice.setAttribute('class',
            'card-body row d-flex justify-content-around');

        this.dice.forEach( (die) => {
            dgDice.appendChild(die.getHTML());
        });

        return(dgDice);
    }

    /**
     * Generates the HTMLElements of the '+' and '-' buttons of a DiceGroup
     * This is used inside the `getHTML()` public function
     */
    private getDiceManip(dgDice: HTMLElement): HTMLElement[] {
        let dgPlus = document.createElement('button');
        let dgMinus = document.createElement('button');

        dgPlus.addEventListener('click', (e: Event) => {
                this.pushDie(new Die(this.diceType));
                dgDice.insertBefore(this.dice[this.dice.length - 1].getHTML(),
                    dgDice.children[dgDice.children.length - 1]
                );
                if (dgDice.childNodes.length > 1) {
                    dgMinus.disabled = false;
                }
            });
        dgPlus.setAttribute('class', 'my-1 p-0 btn btn-primary');
        dgPlus.innerText = '+';

        dgMinus.addEventListener('click', (e: Event) => {
                if (dgDice.childNodes.length > 1) {
                    let x = this.shiftDie();
                    dgDice.removeChild(dgDice.childNodes[0]);
                } else {
                    dgMinus.disabled = true;
                }
            });
        dgMinus.setAttribute('class', 'my-1 p-0 btn btn-secondary');
        dgMinus.innerText = '-';


        return([dgPlus, dgMinus]);
    }

}
