import { Chord, ChordedLyrics } from "./types";
import { toLines, unzip } from "./util";


function parse(text: string): ChordedLyrics {
    const { first, second } =  unzip(
        toLines(text).map((line, index) => {
            const regex = new RegExp(/<\[(.+?)\]>/g)
            let match = regex.exec(line);
            let chords: Chord[] = [];
            let offset = 0;
    
            console.log("scanning " + line + " on index " + index)

            while (match) {
                if (match[1]) {
                    console.log("Found match " + match)

                    chords.push({
                        x: match.index - offset,
                        y: index,
                        chord: match[1]
                    });
                    offset += match[1].length + 4;
                } 
                match = regex.exec(line);
            }
            
            const cleansedLine = line.replace(regex, "").trim();
            return { first: chords, second: cleansedLine };
        })
    );
    return {
        lyrics: second,
        chords: first.flat()
    };
}

export default parse;