import Chord from "./Chord";
import { Annotation } from "./types";

class AnnotatedLyrics {
    constructor(
        public readonly lyrics: string[], 
        public readonly annotations: Annotation[]
    ) {
        
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