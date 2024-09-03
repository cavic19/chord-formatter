import { Chord, ChordedLyrics } from "./types";
import { insertAt, matchAll, toLines, unzip } from "./util";


class ChordEncoder {
    constructor(
        private readonly leftDelimeter: string = "<[",
        private readonly rightDelimeter: string = "]>"
    ) {
        
    }

    private delimetersLength = this.leftDelimeter.length + this.rightDelimeter.length

    decode(text: string): ChordedLyrics {
        const { first, second } =  unzip(
            toLines(text).map(it => it.trim()).map((line, index) => {
                const regex = new RegExp(`${this.escapeRegex(this.leftDelimeter)}(.+?)${this.escapeRegex(this.rightDelimeter)}`, "g");
                let chords: Chord[] = [];
                let offset = 0;
                matchAll(regex, line).forEach(match => {
                    if (match[1]) {
                        chords.push({
                            x: match.index - offset,
                            y: index,
                            chord: match[1]
                        });
                        offset += match[1].length + this.delimetersLength;
                    } 
                })
                const cleansedLine = line.replace(regex, "").trim();
                return { first: chords, second: cleansedLine };
            })
        );
        return {
            lyrics: second,
            chords: first.flat()
        };
    }


    encode({ chords, lyrics }: ChordedLyrics): string {
        return lyrics.map((line, y) => {
            let offset = 0;
            return chords.filter(ch => ch.y === y).reduce((acc, cur) => {
                const newLine = insertAt(acc, cur.x + offset, `${this.leftDelimeter}${cur.chord}${this.rightDelimeter}`);
                offset += cur.chord.length + this.delimetersLength;
                return newLine;
            }, line);
        }).join("\n");
    }

    private escapeRegex(pattern: string): string {
        return pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
}

export default ChordEncoder;