/**
 * A class for containing a group of many different kinds of die.
 */

import { Die } from './Die';
import { DiceGroup } from './DiceGroup';

export class DiceSet {
    public diceGroups: Array<DiceGroup>;
    public lastRollTotal?: number;

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
            ])
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
     * Mutating function to add one or more Die to the DiceSet
     *  Designed to handle either singular or Array style inputs
     */
    public pushDie(inDice: Die): void;
    public pushDie(inDice: Array<Die>): void;
    public pushDie(inDice: any): void {

        if (inDice instanceof Array) {
            inDice.forEach( (de) => {
                this.pushADie(de);
            });
        } else {
            this.pushADie(inDice);
        }
    }

    /**
     * Private function that is called from pushDie to handle the pushing
     *  of a singular Die to a specific Set.
     */
    private pushADie(inDie: Die): void {
        let sides = inDie.sides;
        // See if this Die can be added to a preexisting DiceGroup
        this.diceGroups.forEach( (dg) => {
            if (dg.diceType === sides) {
                dg.pushDie(inDie);
                return;
            }
        });
        // Appropriate DiceGroup did not exist, so create it and add new Die
        this.diceGroups.push(new DiceGroup(sides, [inDie]));
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

        this.lastRollTotal = total;
        return([total, rolls]);
    }

    /**
     * Returns a generated HTMLElement based on the values of the DiceSet object
     */
    public getHTML(): HTMLElement {
        let dsHTML = document.createElement('div');
        let dsRollHTML = document.createElement('h1');
        let dsGroupsHTML = document.createElement('div');
        let dsGroupManip = document.createElement('div');
        let [dsPlus, dsMinus] = this.getGroupManip(dsGroupsHTML);
        let dsRollButton = document.createElement('button');

        dsRollButton.setAttribute('class', 'btn btn-primary w-75');
        dsRollButton.innerText = 'Roll All';
        dsRollButton.addEventListener('click', (e: Event) => {
            this.rollSet();
        });

        dsHTML.setAttribute('class', 'card DiceSet');
        dsRollHTML.setAttribute('class', 'card-title DiceSet');
        dsGroupsHTML.setAttribute('class', 'card-body DiceSet text-center');

        dsRollHTML.innerText = 'Total: ' +
            ((typeof this.lastRollTotal === 'undefined') ?
                '-' : String(this.lastRollTotal));

        dsGroupManip.setAttribute('class', 'card p-2 m-2 dsGroupManip');

        dsGroupManip.appendChild(dsPlus);
        dsGroupManip.appendChild(dsMinus);

        dsGroupsHTML.appendChild(dsRollHTML);
        dsGroupsHTML.appendChild(dsRollButton);
        dsHTML.appendChild(dsGroupsHTML);

        this.diceGroups.forEach( (dg) => {
            dsGroupsHTML.appendChild(dg.getHTML());
        });
        dsGroupsHTML.appendChild(dsGroupManip);

        return(dsHTML);
    }

    private getGroupManip(dsGroupsHTML: HTMLElement): HTMLElement[] {
        let dsPlus = document.createElement('button');
        let dsMinus = document.createElement('button');

        dsPlus.addEventListener('click', (e: Event) => {
            // this.pushGroup(new DiceGroup(this.diceGroups)); // TODO impl
            // dsGroupsHTML.insertBefore(this.diceGroups[this.diceGrousp.length - 1].getHTML(),
            //      dsGroupsHTML.children[dsGroups.children.length - 1]);
            if (dsGroupsHTML.childNodes.length > 1) {
                 dsMinus.disabled = false;
            }
        });
        dsPlus.setAttribute('class', 'btn btn-primary p-2 m-2');
        dsPlus.innerText = '+';

        dsMinus.addEventListener('click', (e: Event) => {
            if (dsGroupsHTML.childNodes.length > 1) {
                // let x = this.shiftDiceGroup(); // TODO impl
                // dsGroupsHTML.removeChild(dsGroupsHTML.childNodes[0]);
            } else {
                dsMinus.disabled = true;
            }
        });
        dsMinus.setAttribute('class', 'btn btn-secondary p-2 m-2');
        dsMinus.innerText = '-';

        return([dsPlus, dsMinus]);
    }
}
