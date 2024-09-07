import Chord from "./Chord";
import { Annotation, AnnotatedLyrics } from "./types";
import { insertAt, matchAll, toLines, unzip } from "./util";


class ChordEncoder {
    constructor(
        private readonly leftDelimeter: string = "<[",
        private readonly rightDelimeter: string = "]>"
    ) {
        
    }

    private delimetersLength = this.leftDelimeter.length + this.rightDelimeter.length

    decode(text: string): AnnotatedLyrics {
        const { first, second } =  unzip(
            toLines(text).map(it => it.trim()).map((line, index) => {
                const regex = new RegExp(`${this.escapeRegex(this.leftDelimeter)}(.+?)${this.escapeRegex(this.rightDelimeter)}`, "g");
                let annotations: Annotation[] = [];
                let offset = 0;
                matchAll(regex, line).forEach(match => {
                    if (match[1]) {
                        annotations.push({
                            letterIndex: match.index - offset,
                            lineIndex: index,
                            note: Chord.parse(match[1]) ?? match[1]
                        });
                        offset += match[1].length + this.delimetersLength;
                    } 
                })
                const cleansedLine = line.replace(regex, "").trim();
                return { first: annotations, second: cleansedLine };
            })
        );
        return {
            lyrics: second,
            annotations: first.flat()
        };
    }


    encode({ annotations: chords, lyrics }: AnnotatedLyrics): string {
        return lyrics.map((line, y) => {
            let offset = 0;
            return chords.filter(ch => ch.lineIndex === y).reduce((acc, cur) => {
                const newLine = insertAt(acc, cur.letterIndex + offset, `${this.leftDelimeter}${cur.note}${this.rightDelimeter}`);
                offset += cur.note.toString().length + this.delimetersLength;
                return newLine;
            }, line);
        }).join("\n");
    }

    private escapeRegex(pattern: string): string {
        return pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
}

export default ChordEncoder;