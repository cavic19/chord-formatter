import Chord from "./Chord";
import { Annotation } from "./types";
import { splitStringAtWordBoundary } from "./util";

class AnnotatedLyrics {
    constructor(
        public readonly lyrics: string[],
        public readonly annotations: Annotation[]
    ) {

    }

    readonly numberOfLines: number = this.lyrics.length;

    static empty(): AnnotatedLyrics {
        return new AnnotatedLyrics([], []);
    }
    
    /**
     * Concat annotations and lyrics + offset the annotations of the second one by the length of hte first one
     */
    add(that: AnnotatedLyrics): AnnotatedLyrics {
        return new AnnotatedLyrics(
            [...this.lyrics, ...that.lyrics],
            [...this.annotations, ...that.annotations.map(a => ({
                letterIndex: a.letterIndex,
                lineIndex: this.numberOfLines + a.lineIndex,
                note: a.note
            }))]
        );
    }

    /**
     * Just concats annotations and lyrics
     */
    private plus(that: AnnotatedLyrics): AnnotatedLyrics {
        return new AnnotatedLyrics(
            [...this.lyrics, ...that.lyrics],
            [...this.annotations, ...that.annotations]
        )
    }

    /**
     * If the line exceeds the maxNumberOfChars it is split into multiple
     * lines and all annotation positions are updated
     */
    withMaxCharsPerLine(maxNumberOfChars: number): AnnotatedLyrics {
        return this.lyrics.reduce((acc, line, i) => {
            const lineAnnotations = this.annotations.filter(a => a.lineIndex == i).map(a => ({ ...a, lineIndex: 0 }))
            const splitAnnotatedLine = AnnotatedLyrics.splitAnnotatedLine(line, lineAnnotations, maxNumberOfChars);
            return acc.add(splitAnnotatedLine)
        }, AnnotatedLyrics.empty());
    }

    /**
     * Split line in multiple lines if its longer than maxNumberOfChars. It also updates annotations. 
     * Annotations passed in should be all of line index 0!
     */
    private static splitAnnotatedLine(line: string, annotations: Annotation[], maxNumberOfChars: number): AnnotatedLyrics {
        const [truncatedLine, remainder] = splitStringAtWordBoundary(line, maxNumberOfChars);
        if (remainder === undefined) {
            return new AnnotatedLyrics([truncatedLine], annotations);
        } else {
            const truncatedAnnotatedLine = new AnnotatedLyrics(
                [truncatedLine],
                annotations.filter(a => a.letterIndex < truncatedLine.length)
            )

            const remainderAnnotations = annotations
                .filter(a => a.letterIndex >= truncatedLine.length)
                .map(a => ({ 
                    ...a, 
                    // -1 because we lost one space char
                    letterIndex: a.letterIndex - truncatedLine.length - 1,
                    // Since wea re creating a new line we have to offset the position by 1
                    lineIndex: a.lineIndex + 1
                 }))

            const remainingAnnotatedLyrics = this.splitAnnotatedLine(remainder, remainderAnnotations, maxNumberOfChars);
            return truncatedAnnotatedLine.plus(remainingAnnotatedLyrics);
        }
    }

    removeChords(): AnnotatedLyrics {
        return new AnnotatedLyrics(
            this.lyrics,
            this.annotations.filter(a => !(a.note instanceof Chord))
        )
    }

    transposeChords(steps: number): AnnotatedLyrics {
        return new AnnotatedLyrics(
            this.lyrics,
            this.annotations.map((annotation) => {
                if (annotation.note instanceof Chord) {
                    return {
                        ...annotation,
                        note: annotation.note.transpose(steps)
                    }
                } else {
                    return annotation
                }
            })
        )
    }
}

export default AnnotatedLyrics;