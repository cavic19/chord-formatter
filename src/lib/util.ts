import { Pair } from "./types";

export function toLines(text: string): string[] {
    return text.split(/\r?\n|\r|\n/g);
}


export function unzip<A, B>(list: Pair<A, B>[]): Pair<A[], B[]> {
    const listA: A[] = [];
    const listB: B[] = [];

    list.forEach(({ first, second }) => {
        listA.push(first);
        listB.push(second);
    });

    return {
        first: listA,
        second: listB
    }
}

/**
 * Generates an empty string of certain length.
 */
export function emptyString(length: number): string {
    return new Array(length + 1).join(" ");
}

/**
 * Returns all matches of the reg on target.
 */
export function matchAll(reg: RegExp, target: string): RegExpExecArray[] {
    let match = reg.exec(target);
    const output = [];
    while (match) {
        output.push(match);
        match = reg.exec(target);
    }
    return output;
}

/**
 *  Insert textToInsert into the string at index.
 */
export function insertAt(string: string, index: number, textToInsert: string): string {
    if (index > string.length) {
        return insertAt(string + emptyString(index - string.length), index, textToInsert);
    }
    return string.slice(0, index) + textToInsert + string.slice(index);
}