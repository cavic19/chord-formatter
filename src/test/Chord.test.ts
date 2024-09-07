import Chord from '../lib/Chord';


describe('Chord.transpose', () => { 
    it("should transpose a valid chord with all components up by a half step", () => {
        const chord = Chord.parse("C#mAdd7/B");

        const actual = chord?.transpose(1);

        const expected = "DmAdd7/C";

        expect(actual?.toString()).toEqual(expected);
    });

    it("should transpose a valid chord with all components up down by multiple steps", () => {
        const chord = Chord.parse("C#mAdd7/B");

        const actual = chord?.transpose(-3);

        const expected = "A#mAdd7/G#";

        expect(actual?.toString()).toEqual(expected);
    });
 });



describe('Chord.parse', () => { 
    it("should parse a valid chord with all the components", () => {
        const validChord = "DbmAdd9/G#";

        const actualChord = Chord.parse(validChord);

        expect(actualChord?.scale).toEqual("Db");
        expect(actualChord?.embellishment).toEqual("mAdd9");
        expect(actualChord?.bass).toEqual("G#");
    });


    it("should parse a valid chord without bass", () => {
        const validChord = "F#sus4";

        const actualChord = Chord.parse(validChord);

        expect(actualChord?.scale).toEqual("F#");
        expect(actualChord?.embellishment).toEqual("sus4");
        expect(actualChord?.bass).toBeUndefined();
    });

    it("should ignore invalid bass", () => {
        // Not a super big deal if the bass gerts ignored .. even if we could recover
        const validChord = "Bbsus4/asd";

        const actualChord = Chord.parse(validChord);

        expect(actualChord?.toString()).toEqual("Bbsus4");
    });

    it("should return undefined if empty string", () => {
        // Not a super big deal if the bass gerts ignored .. even if we could recover
        const testString = "";

        const actualChord = Chord.parse(testString);

        expect(actualChord).toBeUndefined();
    });

    it("should return undefined if invalid first section", () => {
        // Not a super big deal if the bass gerts ignored .. even if we could recover
        const testString = "Xm7";

        const actualChord = Chord.parse(testString);

        expect(actualChord).toBeUndefined();
    });
 });