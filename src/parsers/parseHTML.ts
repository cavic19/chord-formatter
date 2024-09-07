import AnnotatedLyrics from "../lib/AnnotatedLyrics";
import Chord from "../lib/Chord";
import { Annotation } from "../lib/types";
import { matchAll, toLines } from "../lib/util";

/**
 * 
 * @param htmlString This parses very concrete HTML that pisnicky-akordy.cz uses
 */
function parseHTML(htmlString: string): AnnotatedLyrics {
    const preRegex = /<pre>((?:.|\s)*)<\/pre>/;
    const lyrics = preRegex.exec(htmlString)?.[1]?.trim() ?? "";
    if (lyrics.length == 0) {
        return new AnnotatedLyrics([], []);
    }

    const x = lyrics.replace(/<el.*?>|<\/el>/g, "");
    const chords: Annotation[] = [];
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
                        lineIndex: y + 1,
                        letterIndex: m.index,
                        note: Chord.parse(ch) ?? ch
                    })

                    xOffset += ch.length;
                }
            })

        } else {
            lines.push({ i: y, line: line });
        }
    })


    const newAnnotations: Annotation[] = []
    const newLines: string[] = []

    lines.forEach(({ i, line }, actualIndex) => {
        newLines.push(line);
        newAnnotations.push(
            ...chords.filter(ch => ch.lineIndex == i).map(ch => ({
                ...ch,
                lineIndex: actualIndex
            }))
        )
    })

    return new AnnotatedLyrics(newLines, newAnnotations);
}


export default parseHTML;