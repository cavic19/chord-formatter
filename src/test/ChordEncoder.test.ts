import Chord from "../lib/Chord";
import ChordEncoder from "../lib/ChordEncoder";
import { AnnotatedLyrics } from "../lib/types";
describe("parse", () => {
    const encoded = `<[F]>When I look into your <[Dm]>eyes
I can see a love res<[C]>trained
Bu<[F]>t darling when I <[Dm]>hold you
Don't you know I feel the <[C]>same`;

    it("encode(decode(string)) === string", () => {
        const encoder = new ChordEncoder();

        const actualReEncoded = encoder.encode(encoder.decode(encoded));

        expect(actualReEncoded).toEqual(encoded);
    });

    it("should parse as expected", () => {
        const expected: AnnotatedLyrics = {
            annotations: [
                {
                    letterIndex: 0,
                    lineIndex: 0,
                    note: Chord.parse("F")!
                },
                {
                    letterIndex: 22,
                    lineIndex: 0,
                    note: Chord.parse("Dm")!
                },
                {
                    letterIndex: 20,
                    lineIndex: 1,
                    note: Chord.parse("C")!
                },
                {
                    letterIndex: 2,
                    lineIndex: 2,
                    note: Chord.parse("F")!
                },
                {
                    letterIndex: 19,
                    lineIndex: 2,
                    note: Chord.parse("Dm")!
                },
                {
                    letterIndex: 26,
                    lineIndex: 3,
                    note: Chord.parse("C")!
                }
            ],
            lyrics: [
                "When I look into your eyes",
                "I can see a love restrained",
                "But darling when I hold you",
                "Don't you know I feel the same"
            ]
        }
        const encoder = new ChordEncoder();

        const actual = encoder.decode(encoded);

        expect(actual).toEqual(expected);
    });
});
