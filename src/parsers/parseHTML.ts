import { Chord, ChordedLyrics } from "../lib/types";
import { matchAll, toLines } from "../lib/util";

/**
 * 
 * @param htmlString This parses very concrete HTML that pisnicky-akordy.cz uses
 */
function parseHTML(htmlString: string): ChordedLyrics {
    const preRegex = /<pre>((?:.|\s)*)<\/pre>/;
    const lyrics = preRegex.exec(htmlString)?.[1]?.trim() ?? "";
    if (lyrics.length == 0) {
        return {
            chords: [],
            lyrics: []
        }
    }

    const x = lyrics.replace(/<el.*?>|<\/el>/g, "");
    const chords: Chord[] = [];
    const lines: { i: number, line: string }[] = [];

    const chordRegex = /<span.+?class="akord".*?>|<\/span>/g;

    toLines(x).forEach((line, y) => {
        if (chordRegex.test(line)) {
            let xOffset = 0;
            matchAll(/(\S+)/g, line.replace(chordRegex, "")).forEach(m => {
                const ch = m[1];
                if (m) {
                    chords.push({
                        // TODO: Comment
                        y: y + 1,
                        x: m.index,
                        chord: ch
                    })

                    xOffset += ch.length;
                }
            })

        } else {
            lines.push({ i: y, line: line });
        }
    })


    const newChords: Chord[] = []
    const newLines: string[] = []

    lines.forEach(({ i, line }, actualIndex) => {
        newLines.push(line);
        newChords.push(
            ...chords.filter(ch => ch.y == i).map(ch => ({
                ...ch,
                y: actualIndex
            }))
        )
    })

    return {
        chords: newChords,
        lyrics: newLines
    }
}


export default parseHTML;