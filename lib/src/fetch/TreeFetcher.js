"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeCache_1 = __importDefault(require("./cache/NodeCache"));
const ldfetch = require("ldfetch");
const TreeParser_1 = __importDefault(require("./TreeParser"));
const Collection_1 = __importDefault(require("../tree/Collection"));
/**
 * Class used to fetch tree nodes and members
 */
class TreeFetcher {
    constructor() {
        // Create node cache
        this.nodeCache = new NodeCache_1.default(10000);
        this.fetch = new ldfetch({});
    }
    getNode(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.nodeCache.get(id);
        });
    }
    getMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.fetch.get(id);
            let framed = yield this.fetch.frame(response.triples, { '@id': id });
            return framed["@graph"][0];
        });
    }
    getCollection(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let parser = new TreeParser_1.default;
            let data = yield parser.parse(id);
            let keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let obj = data[key];
                if (key === id && obj.hasOwnProperty("type") && obj.type.includes("http://www.w3.org/ns/hydra/core#Collection")) {
                    let manages = obj.hasOwnProperty("manages") ? obj["manages"] : [];
                    let members = obj.hasOwnProperty("member") ? obj["member"] : [];
                    let totalItems = obj.hasOwnProperty("totalItems") ? Number(obj["totalItems"]) : NaN;
                    let view = obj.hasOwnProperty("view") ? obj["view"] : [];
                    return new Collection_1.default(manages, totalItems, members, view);
                }
            }
            throw "No collection found";
        });
    }
    static getInstance() {
        if (!TreeFetcher.instance) {
            TreeFetcher.instance = new TreeFetcher();
        }
        return TreeFetcher.instance;
    }
}
exports.default = TreeFetcher;
//# sourceMappingURL=TreeFetcher.js.map