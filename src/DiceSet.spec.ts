/**
 * Test function for the DiceSet class
 */

import { Die } from "./Die";
import { DiceGroup } from "./DiceGroup";
import { DiceSet } from "./DiceSet";

describe('DiceSet', () => {
    it('should default construct', () => {
        const ds1 = new DiceSet();

        expect(ds1.diceGroups).toEqual([
            new DiceGroup(4),
            new DiceGroup(6),
            new DiceGroup(8),
            new DiceGroup(10),
            new DiceGroup(12),
            new DiceGroup(20),
        ]);
    });

    it('should alternate construct', () => {
        const dg2: Array<DiceGroup> = [new DiceGroup(7), new DiceGroup(11)];
        const ds2 = new DiceSet(dg2);

        expect(ds2.diceGroups).toEqual([new DiceGroup(7), new DiceGroup(11)]);
    });

    it('should dynamically change unique DiceGroups', () => {
        const dg3_a = new DiceGroup(1);
        const ds3 = new DiceSet();

        ds3.addGroup(dg3_a);
        expect(ds3.diceGroups[ds3.diceGroups.length - 1]).toEqual(dg3_a);
        expect(ds3.addGroup(dg3_a)).toEqual(undefined);

        expect(ds3.removeGroup(4)).toEqual(new DiceGroup(4));
        expect(ds3.removeGroup(4)).toEqual(undefined);
    });

    it('should be able to roll as a set', () => {
        const ds4 = new DiceSet().diceSet1();
        const ds4_roll = ds4.rollSet();

        expect(ds4_roll[0]).toBeGreaterThan(6 - 1);
        expect(ds4_roll[0]).toBeLessThan(60 + 1);

        ds4_roll[1].forEach( (rollVal) => {
            expect(rollVal).toBeGreaterThan(1 - 1);
            expect(rollVal).toBeLessThan(20 + 1);
        });
    });
});
