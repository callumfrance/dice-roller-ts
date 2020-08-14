/**
 * A class for containing a group of many different kinds of die.
 */

import { Die } from "./Die"
import { DiceGroup } from "./DiceGroup"

export class DiceSet {
    public diceGroups: Array<DiceGroup>;

    /**
     * The constructor can take in an array of DiceGroup objects, however
     *  a default constructor can be used which will set up some classic
     *  DiceGroup configurations.
     */
    public constructor();
    public constructor(diceGroups: Array<DiceGroup>);
    public constructor(diceGroups?: Array<DiceGroup>) {
        this.diceGroups = diceGroups || [
            new DiceGroup(4),
            new DiceGroup(6),
            new DiceGroup(8),
            new DiceGroup(10),
            new DiceGroup(12),
            new DiceGroup(20),
        ];
    }

    /**
     * Returns a specific type of DiceSet where there is one die already
     *  instantiated for each of the "characteristic" DiceGroups specified.
     */
    public diceSet1(): DiceSet {
        return(
            new DiceSet([
                new DiceGroup(4, [new Die(4)]),
                new DiceGroup(6, [new Die(6)]),
                new DiceGroup(8, [new Die(8)]),
                new DiceGroup(10, [new Die(10)]),
                new DiceGroup(12, [new Die(12)]),
                new DiceGroup(20, [new Die(20)]),
            ],)
        );
    }

    /**
     * Adds a new DiceGroup to the DiceSet, provided an equivalent does
     *  not already exist.
     *
     *  @param inGroup - The new category of Die that is being added
     */
    public addGroup(inGroup: DiceGroup): void {
        this.diceGroups.forEach( (element) => {
            if (element.diceType === inGroup.diceType) {
                return(null); // Terminate early because DiceGroup was found
            }
        });

        this.diceGroups.push(inGroup); // Add unique DiceGroup to DiceSet
    }

    /**
     * Pops a given category of Die off of the DiceSet
     *
     * @returns DiceGroup that was popped off, or nothing if it was never there
     */
    public removeGroup(sides: number): DiceGroup | void {
        for (var i = 0; i < this.diceGroups.length; i++) {
            if (this.diceGroups[i].diceType === sides) {
                let grp = this.diceGroups.splice(i, 1);
                return(grp[0]);
            }
        }
    }

    /**
     * Rolls every Die inside every DiceGroup and outputs the total as well
     *  as the result of each individual Die.
     *
     * @returns A tuple of the total roll with each individual roll it comprises
     */
    public rollSet(): [number, Array<number>] {
        let total: number = 0;
        let rolls: Array<number> = [];

        this.diceGroups.forEach( (element) => {
            total += element.rollGroup()[0];
            element.rollGroup()[1].forEach( (elementRoll) => {
                rolls.push(elementRoll);
            });
        });
        
        return([total, rolls]);
    }
}
