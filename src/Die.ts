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
        let dieHTMLRoll = document.createElement('p');

        dieHTML.setAttribute('class', 'col-2 m-3 card Die ' + this.name);
        dieHTML.style.height = '70px';

        dieHTMLRoll.setAttribute('class', 'card-title py-3 px-1 m-auto h4 DieRoll ' + this.name);
        dieHTMLRoll.innerText = (typeof this.lastRoll === 'undefined') ?
            '-' : String(this.lastRoll);

        dieHTML.appendChild(dieHTMLRoll);

        return(dieHTML);
    }
}
