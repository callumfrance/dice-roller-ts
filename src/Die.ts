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
}
