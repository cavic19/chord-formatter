
class Chord {
    private static readonly transpostionSharpTable = [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B"
    ];

    private static readonly transpostionFlatTable = [
        "C",
        "Db",
        "D",
        "Eb",
        "E",
        "F",
        "Gb",
        "G",
        "Ab",
        "A",
        "Bb",
        "B"
    ]

    // It is sorted so the sharp, and flat tones always preced the others, is is because of the regex matching.
    public static readonly allowedSymbols = Array.from(new Set([...Chord.transpostionSharpTable, ...Chord.transpostionFlatTable])).sort().reverse();

    private static chordRegex = new RegExp("^(" + Chord.allowedSymbols.join("|") + ")(.*)");
    private static bassRegex = new RegExp("^" + Chord.allowedSymbols.join("|") + "$");


    static parse(text: string): Chord | undefined {
        const sections = text.split("/");
        if (sections.length == 2) {
            const [chordSection, bassSection] = sections;
            const chord = Chord.parseChord(chordSection);
            if (!chord) {
                return undefined;
            }
            if (Chord.bassRegex.test(bassSection)) {
                return new Chord(chord.scale, chord.embellishment, bassSection);
            } else {
                return chord;
            }
        } else if (sections.length == 1) {
            return Chord.parseChord(sections[0]);
        } else {
            return undefined;
        }
    }

    private static parseChord(text: string): Chord | undefined {
        const match = Chord.chordRegex.exec(text);
        if (match) {
            // First capturing group is the scale
            return new Chord(match[1], match.at(2));
        } else {
            return undefined;
        }
    }


    private constructor(
        // Assume we only have C, C#, Db D, E, F, G, A, B, ..
        public readonly scale: string,
        public readonly embellishment?: string,
        public readonly bass?: string,
    ) {

    }

    /**
     * 1 -> (C -> C#)
     * 2 -> (C -> D)
     * -1 -> (C -> B)
     */
    transpose(transposition: number): Chord {
        const steps = Math.round(transposition);
        const newScale = Chord.transposeTone(this.scale, steps);
        const newBass = this.bass ? Chord.transposeTone(this.bass, steps) : undefined;
        return new Chord(newScale, this.embellishment, newBass);
    }
    
    /**
     * 0.5 -> (C -> C#)
     * 1 -> (C -> D)
     * -0.5 -> (C -> B)
     * @param tone one of the allowed symbols
     * @param steps positive/negative integer
     */
    private static transposeTone(tone: string, steps: number): string {
        const sharpIndex = Chord.transpostionSharpTable.indexOf(tone);
        const flatIndex = Chord.transpostionFlatTable.indexOf(tone);
        if (sharpIndex !== -1) {
            const newSharpIndex = (sharpIndex + steps) % Chord.transpostionSharpTable.length;
            // Since we are using the module we can never get over the bounds
            return Chord.transpostionSharpTable.at(newSharpIndex)!;
        } else if (flatIndex !== -1) {
            const newFlatIndex = (flatIndex + steps) % Chord.transpostionFlatTable.length;
            // Since we are using the module we can never get over the bounds
            return Chord.transpostionFlatTable.at(newFlatIndex)!;
        } else {
            throw Error("");
        }
    }

    toString(): string {
        return `${this.scale}${this.embellishment ?? ""}${this.bass ? "/" + this.bass : ""}`;
    }
}


export default Chord;