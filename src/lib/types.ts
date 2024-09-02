export type Chord = {
    // Horizontal position of the chord (in letters)
    x: number
    // Vertical position of the chords (which line)
    y: number
    // The chords like C, G, Am ... 
    chord: string
};


export type ChordedLyrics = {
    lyrics: string[]
    chords: Chord[]
};

export type Pair<A, B> = {
    first: A, 
    second: B
};