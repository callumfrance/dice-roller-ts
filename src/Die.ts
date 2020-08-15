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
        // let dieHTMLName = document.createElement('p');

        dieHTML.setAttribute('class', 'col-2 m-3 card Die ' + this.name);

        dieHTMLRoll.setAttribute('class', 'card-body m-auto h4 DieRoll ' + this.name);
        dieHTMLRoll.innerText = (typeof this.lastRoll === 'undefined') ?
            '-' : String(this.lastRoll);

        // dieHTMLName.setAttribute('class', 'card-text DieName ' + this.name);
        // dieHTMLName.innerText = this.name;

        dieHTML.appendChild(dieHTMLRoll);
        // dieHTML.appendChild(dieHTMLName);

        return(dieHTML);
    }
}
