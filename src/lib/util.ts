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


export function splitStringAtWordBoundary(input: string, maxLength: number): [string, string | undefined] {
    // If the input length is already less than or equal to maxLength, return the whole string as the first part
    if (input.length <= maxLength) {
        return [input, undefined];
    }

    // Find the last word boundary before or at the maxLength position
    const substring = input.slice(0, maxLength + 1); // +1 to ensure we include the maxLength character
    const lastSpaceIndex = substring.lastIndexOf(' ');

    // If there's no space, return the whole string in one part (no word boundaries)
    if (lastSpaceIndex === -1) {
        return [input, undefined];
    }

    // Split the string at the last space
    const firstPart = input.slice(0, lastSpaceIndex).trim();
    const secondPart = input.slice(lastSpaceIndex + 1).trim();

    return [firstPart, secondPart];
}
