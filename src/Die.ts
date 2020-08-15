/**
 * The smallest rollable object. A single Die
 */
export class Die {
    public sides: number;
    public name: string;
    public lastRoll?: number;

    public constructor(
        sides: number,
        name?: string,
    ) {
        this.sides = sides;
        this.name = name || ('d' + String(sides));
    }

    /**
     * Gives a random number between 1 and this.sides
     */
    public roll(): number {
        this.lastRoll = 1 + Math.floor((Math.random() * this.sides));
        return(this.lastRoll);
    }

    /**
     * Returns a generated HTMLElement based on the Die objects values
     */
    public getHTML(): HTMLElement {
        let dieHTML = document.createElement('div');
        dieHTML.setAttribute('class', 'Die ' + this.name);
        dieHTML.style.border = '1px dotted black';
        dieHTML.style.background = 'PapayaWhip';

        let dieHTMLRoll = document.createElement('p');
        dieHTMLRoll.setAttribute('class', 'DieRoll ' + this.name);
        dieHTMLRoll.innerText = (typeof this.lastRoll === 'undefined') ?
            '-' : String(this.lastRoll);

        let dieHTMLName = document.createElement('p');
        dieHTMLName.setAttribute('class', 'DieName ' + this.name);
        dieHTMLName.innerText = this.name;

        dieHTML.appendChild(dieHTMLRoll);
        dieHTML.appendChild(dieHTMLName);

        return(dieHTML);
    }
}
