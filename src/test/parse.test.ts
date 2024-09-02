import { parse } from "../lib/parse"
import { ChordedLyrics } from "../lib/types";

describe("parse", () => {
    it("should parse as expected", () => {
        const text = `
        <[F]>When I look into your <[Dm]>eyes
        I can see a love res<[C]>trained
        Bu<[F]>t darling when I <[Dm]>hold you
        Don't you know I feel the <[C]>same
    `;

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

        const actual = parse(text)

        expect(expected).toEqual(actual)
    });
});
