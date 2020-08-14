/**
 * Test function for the Die class
 */
import { Die } from "./Die";

describe('Die', () => {
	it('should roll', () => {
		const d4 = new Die(4);

		expect(d4.sides).toBe(4);
		expect(d4.name).toBe("d4");
		expect(d4.lastRoll).toBe(undefined);

		d4.roll();

		expect([1, 2, 3, 4]).toContain(d4.lastRoll);
	});

	it('should alternate construct', () => {
		const d6 = new Die(6, "Phil");

		expect(d6.sides).toBe(6);
		expect(d6.name).toBe("Phil");
		expect(d6.lastRoll).toBe(undefined);

		d6.roll();

		expect([1, 2, 3, 4, 5, 6]).toContain(d6.lastRoll);
	});
});
