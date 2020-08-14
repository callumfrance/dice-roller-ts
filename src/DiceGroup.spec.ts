/**
 * Test function for the DiceGroup class
 */

import { Die } from "./Die";
import { DiceGroup } from "./DiceGroup";

describe('DiceGroup', () => {
	it('should default construct', () => {
		const dg1 = new DiceGroup(4);

		expect(dg1.diceType).toBe(4);
		expect(dg1.dice).toEqual(new Array<Die>());
		expect(dg1.modifier).toBe(0);

		dg1.modifier = 6;
		expect(dg1.modifier).toBe(6);

		dg1.modifier = -77;
		expect(dg1.modifier).toBe(-77);
	});

	it('should add and remove appropriate dice', () => {
		const dg2 = new DiceGroup(6);
		expect(dg2.dice).toEqual(new Array<Die>());

		dg2.pushDie(new Die(6));
		expect(dg2.dice).toEqual([new Die(6)]);

		dg2.pushDie(new Die(6, "Wallace"));
		expect(dg2.dice).toEqual([new Die(6), new Die(6, "Wallace")]);

		expect(dg2.shiftDie()).toEqual(new Die(6, "d6"));
		expect(dg2.dice).toEqual([new Die(6, "Wallace")]);

		dg2.pushDie([new Die(6, "Digby"),
			new Die(6, "Horace")]);
		expect(dg2.dice).toEqual([new Die(6, "Wallace"), 
			new Die(6, "Digby"), new Die(6, "Horace")]);

		expect(dg2.shiftDie()).toEqual(new Die(6, "Wallace"));
		expect(dg2.dice).toEqual([new Die(6, "Digby"), 
			new Die(6, "Horace")]);

		spyOn(console, 'log');
		dg2.pushDie(new Die(20));
		expect(console.log).toHaveBeenCalled();
		expect(dg2.dice).toEqual([new Die(6, "Digby"), 
			new Die(6, "Horace")]);
	});

	it('should roll all dice', () => {
		const dg3 = new DiceGroup(8, 
			[new Die(8), new Die(8), new Die(8, "Roos")],
			6);

		expect(dg3.dice).toEqual(
			[new Die(8, "d8"), new Die(8), new Die(8, "Roos")]);
		expect(dg3.diceType).toBe(8);

		var rollg = dg3.rollGroup();
		expect(rollg[0]).toBeLessThan(24 + 6 + 1);
		expect(rollg[0]).toBeGreaterThan(6 - 1);

		rollg[1].forEach( (iRoll) => {
			expect(iRoll).toBeLessThan(8 + 1);
			expect(iRoll).toBeGreaterThan(1 - 1);
		});
	});
});
