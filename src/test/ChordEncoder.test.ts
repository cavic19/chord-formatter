import ChordEncoder from "../lib/ChordEncoder";
import { ChordedLyrics } from "../lib/types";

describe("parse", () => {
    const encoded = `<[F]>When I look into your <[Dm]>eyes
I can see a love res<[C]>trained
Bu<[F]>t darling when I <[Dm]>hold you
Don't you know I feel the <[C]>same`;

    it("encode(decode(string)) === string", () => {
        const encoder = new ChordEncoder();

        const actualReEncoded = encoder.encode(encoder.decode(encoded));

        console.log("ACT", actualReEncoded);
        console.log("EXP", encoded);

        expect(actualReEncoded).toEqual(encoded);
    });

    it("should parse as expected", () => {
        const expected: ChordedLyrics = {
            chords: [
                {
                    x: 0,
                    y: 0,
                    chord: "F"
                },
                {
                    x: 22,
                    y: 0,
                    chord: "Dm"
                },
                {
                    x: 20,
                    y: 1,
                    chord: "C"
                },
                {
                    x: 2,
                    y: 2,
                    chord: "F"
                },
                {
                    x: 19,
                    y: 2,
                    chord: "Dm"
                },
                {
                    x: 26,
                    y: 3,
                    chord: "C"
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
