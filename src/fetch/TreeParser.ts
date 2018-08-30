import tree_parser = require('ldtree-parser');

export default class TreeParser {

    public async parse(url) {
        return await tree_parser.parse_tree(url, this.createParserOptions());
    }

    private createParserOptions() {
        let options = {};
        options["aliases"] = {};
        options["removable_prefixes"] = new Set();
        options["single_predicates"] = new Set();

        options["aliases"]["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] = "type";

        options["aliases"]["https://w3id.org/tree#value"] = "value";
        options["single_predicates"].add("https://w3id.org/tree#value");

        options["aliases"]["http://www.w3.org/ns/hydra/core#totalItems"] = "totalItems";
        options["single_predicates"].add("http://www.w3.org/ns/hydra/core#totalItems");

        options["aliases"]["https://w3id.org/tree#hasChildRelation"] = "hasChildRelation";

        options["aliases"]["http://www.w3.org/ns/hydra/core#member"] = "member";

        options["aliases"]["https://w3id.org/tree#child"] = "child";
        return options;
    }
}