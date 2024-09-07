import Chord from "./Chord";

export type Annotation = {
    // Horizontal position of the chord (in letters)
    letterIndex: number
    // Vertical position of the chords (which line)
    lineIndex: number
    // The chords like C, G, Am ... 
    note: Chord | string
};


export type Pair<A, B> = {
    first: A, 
    second: B
};
