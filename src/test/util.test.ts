import { insertAt } from "../lib/util";

describe("insertAt", () => {
    // length 20
    const testString = "This is test string!"

    it("zero index", () => {
        const actual = insertAt(testString, 0, "(PROBE)")
        expect(actual).toBe("(PROBE)This is test string!")
    });

    it("index larger than length", () => {
        const actual = insertAt(testString, 25 , "(PROBE)")
        expect(actual).toBe("This is test string!     (PROBE)")
    });

    it("index equal length", () => {
        const actual = insertAt(testString, testString.length, "(PROBE)")
        expect(actual).toBe("This is test string!(PROBE)")
    });

    it("index between 0 and length", () => {
        const actual = insertAt(testString, 5, "(PROBE)")
        expect(actual).toBe("This (PROBE)is test string!")
    });
});