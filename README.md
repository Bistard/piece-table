# Introduction
A TypeScript implementation of the piece table data structure with red-black tree, multiple buffered and optimized by for line model.

The repository is almost rewritten by myself from the VSCode's piece-table version. Almost nothing new except more readable coding styles and comments.

# What Is Special
1. The piece table is written using red-black tree as the balanced binary tree.
2. The piece table may handle all the possible end-of-line cases correctly.
3. If you are interest in more details about the idea, see the following link from the blog of [VSCode](https://code.visualstudio.com/blogs/2018/03/23/text-buffer-reimplementation).

# How To Use
You may use `PieceTableBuilder` to build `PieceTable` for yourself as following:
```ts
function buildPieceTable(contents: string[], normalizationEOL?: boolean, defaultEOL?: EndOfLineType, force?: boolean): IPieceTable {
    const builder = new PieceTableBuilder();
    for (const content of contents) {
        builder.receive(content);
    }
    builder.build();
    return builder.create(normalizationEOL, defaultEOL, force);
}
```

# How to Test
```
npm run test
```