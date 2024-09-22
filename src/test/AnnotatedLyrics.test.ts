import AnnotatedLyrics from '../lib/AnnotatedLyrics';
import Chord from '../lib/Chord';

describe("breakAtWidth", () => {
    it('should work when no line exceed the maximum', () => {
        /*
        <[F]>When I look into your <[Dm]>eyes --> length() = 26
        I can see a love res<[C]>trained --> length() = 27
        Bu<[F]>t darling when I <[Dm]>hold you --> length() = 27
        Don't you know I feel the <[C]>same --length() = 30
        */
        const lyrics = new AnnotatedLyrics(
            [
                "When I look into your eyes",
                "I can see a love restrained",
                "But darling when I hold you",
                "Don't you know I feel the same"
            ],
            [
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
            ]
        );

        const actual = lyrics.withMaxCharsPerLine(30);
        expect(actual).toEqual(lyrics);
    });

    it("should work when the line is just a little bit longer", () => {
        /*
        <[F]>When I look into your <[Dm]>eyes --> length() = 26
        I can see a love res<[C]>trained --> length() = 27
        Bu<[F]>t darling when I <[Dm]>hold you --> length() = 27
        Don't you know I feel the <[C]>same --length() = 30
        */
        const lyrics = new AnnotatedLyrics(
            [
                "When I look into your eyes",
                "I can see a love restrained",
                "But darling when I hold you",
                "Don't you know I feel the same"
            ],
            [
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
            ]
        );

        /*
        <[F]>When I look into your
        <[Dm]>eyes
        I can see a love
        res<[C]>trained
        Bu<[F]>t darling when I
        <[Dm]>hold you
        Don't you know I feel
        the <[C]>same
        */
        const expected = new AnnotatedLyrics(
            [
                "When I look into your",
                "eyes",
                "I can see a love",
                "restrained",
                "But darling when I",
                "hold you",
                "Don't you know I feel",
                "the same"
            ],
            [
                {
                    letterIndex: 0,
                    lineIndex: 0,
                    note: Chord.parse("F")!
                },

                {
                    letterIndex: 0,
                    lineIndex: 1,
                    note: Chord.parse("Dm")!
                },

                {
                    letterIndex: 3,
                    lineIndex: 3,
                    note: Chord.parse("C")!
                },
                {
                    letterIndex: 2,
                    lineIndex: 4,
                    note: Chord.parse("F")!
                },
                {
                    letterIndex: 0,
                    lineIndex: 5,
                    note: Chord.parse("Dm")!
                },
                {
                    letterIndex: 4,
                    lineIndex: 7,
                    note: Chord.parse("C")!
                },
            ]
        );

        const actual = lyrics.withMaxCharsPerLine(21);

        expect(actual).toEqual(expected);
    });


    it("should split line that is too long in more than 2 lines", () => {
        /*
        Lor<[1]>em ipsum <[2]>dolor s<[3]>it amet, consec<[4]>tetur adipiscing elit
        curabi<[5]>tur id ex<[6]>
        l<[7]>orem
        */
        const lyrics = new AnnotatedLyrics(
            [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                "curabitur id ex",
                "lorem"
            ],
            [
                {
                    letterIndex: 3,
                    lineIndex: 0,
                    note: "1"
                },   
                {
                    letterIndex: 12,
                    lineIndex: 0,
                    note: "2"
                },   
                {
                    letterIndex: 19,
                    lineIndex: 0,
                    note: "3"
                },   
                {
                    letterIndex: 34,
                    lineIndex: 0,
                    note: "4"
                },    

                {
                    letterIndex: 6,
                    lineIndex: 1,
                    note: "5"
                },    

                {
                    letterIndex: 15,
                    lineIndex: 1,
                    note: "6"
                },    


                {
                    letterIndex: 1,
                    lineIndex: 2,
                    note: "7"
                },    
            ]
        );

        /*
        Lor<[1]>em ipsum 
        <[2]>dolor s<[3]>it amet,
        consec<[4]>tetur
        adipiscing elit
        curabi<[5]>tur id ex<[6]>
        l<[7]>orem
        */
        const expected = new AnnotatedLyrics(
            [
                "Lorem ipsum", 
                "dolor sit amet,", 
                "consectetur", 
                "adipiscing elit",
                "curabitur id ex",
                "lorem"
            ],
            [
                {
                    letterIndex: 3,
                    lineIndex: 0,
                    note: "1"
                },   
                {
                    letterIndex: 0,
                    lineIndex: 1,
                    note: "2"
                },  
                {
                    letterIndex: 7,
                    lineIndex: 1,
                    note: "3"
                },   
                {
                    letterIndex: 6,
                    lineIndex: 2,
                    note: "4"
                },   
                {
                    letterIndex: 6,
                    lineIndex: 4,
                    note: "5"
                }, 
                {
                    letterIndex: 15,
                    lineIndex: 4,
                    note: "6"
                },  
                {
                    letterIndex: 1,
                    lineIndex: 5,
                    note: "7"
                },   
            ]
        );

        const actual = lyrics.withMaxCharsPerLine(15);

        expect(actual).toEqual(expected);
    });
});