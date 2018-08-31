"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tree_parser = require("ldtree-parser");
class TreeParser {
    parse(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tree_parser.parse_tree(url, this.createParserOptions());
        });
    }
    createParserOptions() {
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
        options["aliases"]["http://www.w3.org/ns/hydra/core#manages"] = "manages";
        options["aliases"]["http://www.w3.org/ns/hydra/core#view"] = "view";
        return options;
    }
}
exports.default = TreeParser;
//# sourceMappingURL=TreeParser.js.map