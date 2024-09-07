import ChordEncoder from "./ChordEncoder";
import { AnnotatedLyrics } from "./types";
import { emptyString } from "./util";

/**
 * Render a simple html that can display chords over lyrics
 * 
 * Example:
 * 
 * <pre>
 * <span style="color:red;">F</span>                     <span style="color:red;">Dm</span>
 * When I look into your eyes
 *                     <span style="color:red;">C</span>
 * I can see a love restrained
 *   <span style="color:red;">F</span>                <span style="color:red;">Dm</span>
 * But darling when I hold you
 *                           <span style="color:red;">C</span>
 * Don't you know I feel the same
 * </pre>
 */
class SimpleHTMLRenderer {
    constructor(
        public readonly chordStyle?: string,
        public readonly chordClass?: string,
    ) {
        
    }

    private defaultEncoder = new ChordEncoder();

    renderHTMLFromString(str: string): string {
        return this.renderHTML(this.defaultEncoder.decode(str));
    }

    renderHTML({ lyrics, annotations: chords }: AnnotatedLyrics): string {
        const innerHtml = lyrics.flatMap((line, index) => {
            let offset = 0;
            const chordsLine = chords.filter(({ lineIndex: y }) => y == index).reduce((acc, cur) => {
                const output = emptyString(cur.letterIndex - offset) + this.createChordElement(cur.note.toString());
                offset = cur.letterIndex + cur.note.toString().length;
                return acc + output;
            }, "");
    
            if (chordsLine.length === 0) {
                return [line];
            } else {
                return [chordsLine, line];
            }
        });
    
        return `<pre>${innerHtml.join("\n")}</pre>`;
    }

    private createChordElement(text: string): string {
        const styleAttr = this.chordStyle ? ` style="${this.chordStyle}"` : "";
        const classAttr = this.chordClass ? ` class="${this.chordStyle}"` : "";
        return "<span" + styleAttr + classAttr + ">" + text + "</span>";
    }
}

export default SimpleHTMLRenderer;