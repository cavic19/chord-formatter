import { ChordedLyrics } from "./types";
import { emptyString } from "./util";

/**
 * Creates and html wrapped in pre tags which reflects the spacing between the chords specified in the ChordedLyrics
 */
export function renderHTML({ lyrics, chords }: ChordedLyrics): string {
    const innerHtml = lyrics.flatMap((line, index) => {
        let offset = 0;
        const chordsLine = chords.filter(({ y }) => y == index).reduce((acc, cur) => {
            const output = emptyString(cur.x) + `<span style="color:red;font-weight: 600">${cur.chord}</span>`
            offset += output.length
            return acc + output
        }, "");

        if (chordsLine.length === 0) {
            return []
        } else {
            return [chordsLine, line]
        }
    });


    return `<pre>${innerHtml.join("\n")}</pre>`;
}
