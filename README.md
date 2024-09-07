# Chord formatter

This library allows you to encode and decode lyrics with chords in it. It also provided a simple HTML renderer that takes in the lyrics with chords and prints them nicely on the screen. Decoded chords come with its position (vertical, and horizonal) and parsed an instance of `Chord` class. It means it can be easily transposed. 

## Example
```ts
const input = `
    <[F]>When I look into your <[Dm]>eyes
    I can see a love res<[C]>trained
    Bu<[F]>t darling when I <[Dm]>hold you
    Don't you know I feel the <[C]>same
`;

const encoder = new ChordEncoder();

const annotatedLyrics = encoder.decode(input);

// Will transpose all the chords by 2 half steps
const transposedAnnotatedLyrics = annotatedLyrics.transposeChords(2);

const htmlString = new SimpleHTMLRenderer().renderHTML(transposedAnnotatedLyrics);
```