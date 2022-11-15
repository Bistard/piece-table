
export namespace Character {

    /**
	 * @description Determines if the given character is a high surrogate.
	 * {@link https://www.informit.com/articles/article.aspx?p=2274038&seqNum=10}
	 */
	export function isHighSurrogate(char: number): boolean {
		return 0xD800 <= char && char <= 0xDBFF;
	}

	/**
	 * @description Determines if the given character is a low surrogate.
	 * {@link https://www.informit.com/articles/article.aspx?p=2274038&seqNum=10}
	 */
	export function isLowSurrogate(char: number): boolean {
		return 0xDC00 <= char && char <= 0xDFFF;
	}
}

export const enum CharCode {
    /**
	 * The `\n` character.
	 */
	LineFeed = 10,
    /**
	 * The `\r` character.
	 */
    CarriageReturn = 13,
}