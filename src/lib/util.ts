import { Pair } from "./types";

export function toLines(text: string): string[] {
    return text.trim().split(/\r?\n|\r|\n/g).map(it => it.trim());
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

export function emptyString(length: number): string {
    return new Array(length + 1).join(" ");
}