import treeParser = require('ldtree-parser');

export default class TreeParser {

    public async parse(url) {
        let singles = new Set([
            "https://w3id.org/tree#value",
            "http://www.w3.org/ns/hydra/core#totalItems",
        ]);

        return await treeParser.parseTree(url, singles);
    }
}