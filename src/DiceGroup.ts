/**
 * A class for containing a group of Dice which have the same number of sides.
 * A modifier value is placed here which can be added to the total roll once.
 */

import { Die } from './Die';

export class DiceGroup {
    public diceType: number;
    public dice: Array<Die>;
    public modifier: number;

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

        return([total, rolls, this.dice]);
    }
}
