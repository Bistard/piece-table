export const enum EndOfLineType {
    /** 
     * Use line feed (\n) as the end of line character. 
     */
	LF = 1,
	/** 
     * Use carriage return and line feed (\r\n) as the end of line character. 
     */
	CRLF = 2
}

export const enum EndOfLine {
    LF = '\n',
    CRLF = '\r\n'
}

/**
 * For red-black tree usage.
 */
export const enum RBColor {
    BLACK = 1,
    RED = 2
}

/**
 * A data structure used for piece table.
 */
export interface ITextBuffer {
    /** The string buffer. */
    buffer: string;

    /** The array that contains all the linestarts in the buffer. */
    linestart: number[];
}

export interface IPosition {
    /**
     * Line number (zero-based).
     */
    readonly lineNumber: number;

    /**
     * Line offset (zero-based). First character in a line.
     */
    readonly lineOffset: number;
}

export class Position implements IPosition {

    // [field]

    public readonly lineNumber: number;
    public readonly lineOffset: number;

    // [constructor]

    constructor(lineNumber: number, lineOffset: number) {
        this.lineNumber = lineNumber;
        this.lineOffset = lineOffset;
    }
}

/**
 * Representing a position relatives to a buffer.
 */
export interface IBufferPosition extends IPosition {}

/**
 * Representing a position relatives to a piece.
 */
export interface IPiecePosition extends IPosition {}

/**
 * Internal data structure in {@link IPieceTable}.
 */
export interface IPiece {
    /** 
     * Which buffer the piece is refering in the whole table. 
     */
    readonly bufferIndex: number;

     /**
      * The length of the piece.
      */
    readonly pieceLength: number;
 
     /**
      * The linefeed counts of the corresponding buffer.
      */
    readonly lfCount: number;
 
     /** 
      * The start position of the piece in the corresponding buffer. 
      */
    readonly start: IBufferPosition;
 
     /** 
      * The end position of the piece in the corresponding buffer (not included).
      */
    readonly end: IBufferPosition;
}

/**
 * Internal red-black tree data structure used in {@link IPieceTable}.
 */
export interface IPieceNode {

    readonly color: RBColor;

    readonly parent: IPieceNode;
    readonly left: IPieceNode;
    readonly right: IPieceNode;

    readonly leftSubtreeBufferLength: number;
    readonly leftSubtreelfCount: number;

    readonly piece: IPiece;
}

/**
 * Describing a position of a {@link IPieceNode} in the {@link IPieceTable}.
 */
export interface IPieceNodePosition {

    /**
     * Corresponding piece.
     */
    readonly node: IPieceNode;

    /**
     * The start offset of the piece relatives to the whole text model.
     */
    readonly textOffset: number;
}

/**
 * An interface only for {@link PieceTable}.
 */
export interface IPieceTable {

    /**
     * The root of the piece table.
     */
    readonly root: IPieceNode;

    /**
     * @description Inserts the given text at the given offset.
     * @param textOffset The character offset relatives to the whole text model.
     * @param text The text to be inserted.
     */
    insertAt(textOffset: number, text: string): void;

    /**
     * @description Deletes the text with given length at the given offset.
     * @param textOffset The character offset relatives to the whole text model.
     * @param length The length of text to be deleted.
     */
    deleteAt(textOffset: number, length: number): void;

    /**
     * @description Returns all the line contents (without line breaking).
     * @returns An array of string, each string represents a line content.
     * @complexity O(n), length of the text model.
     */
    getContent(): string[];

    /**
     * @description Returns all the line contents in raw string.
     * @returns A string represents the raw text data (include link breaking).
     * @complexity O(n), length of the text model.
     */
    getRawContent(): string;

    /**
     * @description Returns the line string of the corresponding line number (
     * not include line breaking).
     * @param lineNumber (zero-based) line number.
     * @complexity O(h)
     */
    getLine(lineNumber: number): string;

    /**
     * @description Returns the raw line string of the corresponding line number
     * (include line breaking).
     * @param lineNumber (zero-based) line number.
     * @complexity O(h)
     */
    getRawLine(lineNumber: number): string;

    /**
     * @description Returns the line length of the corresponding line number (
     * include line breaking).
     * @param lineNumber (zero-based) line number.
     * @complexity O(h)
     */
    getLineLength(lineNumber: number): number;

    /**
     * @description Returns the raw line length of the corresponding line number
     * (include line breaking).
     * @param lineNumber (zero-based) line number.
     * @complexity O(h)
     */
    getRawLineLength(lineNumber: number): number;

    /**
     * @description Returns the total text length of all the buffers.
     * @complexity O(1)
     */
    getBufferLength(): number;

    /**
     * @description Returns the total line counts.
     * @complexity O(1)
     */
    getLineCount(): number;

    /**
     * @description Returns the character offset.
     * @param lineNumber (zero-based) line number.
     * @param lineOffset The offset relative to the line.
     * @returns The character offset relatives to the whole text model.
     * @complexity O(h)
     */
    getOffsetAt(lineNumber: number, lineOffset: number): number;

    /**
     * @description Returns the character position.
     * @param textOffset The character offset relatives to the whole text model.
     * @returns A {@link IPosition}.
     * @complexity O(h)
     */
    getPositionAt(textOffset: number): IPosition;

    /**
     * @description Returns the charcode at the given text offset.
     * @param textOffset The character offset relatives to the whole text model.
     * @complexity O(h)
     */
    getCharcodeByOffset(textOffset: number): number;

    /**
     * @description Returns the charcode at the given line number and line offset.
     * @param lineNumber (zero-based) line number.
     * @param lineOffset The offset relative to the line.
     * @complexity O(h)
     */
    getCharcodeByLine(lineNumber: number, lineOffset: number): number;

    /**
     * @description Iterate each tree node in pre-order.
     * @param fn The callback function to apply to each node.
     * @complexity O(n), n - number of pieces in the table.
     */
    forEach(fn: (node: IPieceNode) => void): void;

}
