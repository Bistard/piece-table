
export type Tuple<Size extends number, Arr extends Readonly<unknown[]>> = Arr['length'] extends Size ? Size extends Arr['length'] ? Arr : never : never;
export type Pair<T, R> = Tuple<2, [T, R]>;

const ascii = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\r\n';

export namespace Random {

    /**
     * @desscription Generates a random integer given the upper bounds. The 
     * range is [0, bound).
     * @param bound The upper bound.
     */
    export function int(bound: number): number {
        return (Math.random() * bound) | 0;
    }

    /**
     * @desscription Generates a random integer given the bounds. The range is 
     * [min, max).
     * @param min The min bound.
     * @param max The max bound.
     */
    export function intAt(min: number, max: number): number {
        return min + (Math.random() * (max - min) | 0);
    }

    /**
     * @description Returns a random ascii alphabet in string form.
     */
    export function char(): string {
        return ascii[int(ascii.length)]!;
    }

    /**
     * @description Returns a generated random string with the given length.
     * @param len The length of the generated string.
     */
    export function string(len: number): string {
        const chars: string[] = [];
        for (let i = 0; i < len; i++) {
            chars.push(char());
        }
        return chars.join('');
    }

    /**
     * @description Returns a true that has a given probability.
     * @param probability Must be [0, 1]
     */
    export function maybe(probability: number): boolean {
        return Math.random() <= probability;
    }
}