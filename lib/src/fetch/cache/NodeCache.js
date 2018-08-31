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
const LRU = require("lru-cache");
const Node_1 = __importDefault(require("../../tree/Node"));
const ChildRelation_1 = __importDefault(require("../../tree/ChildRelation"));
const TreeParser_1 = __importDefault(require("../TreeParser"));
class NodeCache {
    constructor(maxNodes) {
        this.cache = new LRU({
            max: maxNodes,
            maxAge: 1000 * 60,
            stale: true,
            noDisposeOnSet: true,
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = this.cache.peek(id) !== undefined;
            if (!found) {
                yield this.addToCache(id);
            }
            return this.cache.get(id);
        });
    }
    addToCache(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let parser = new TreeParser_1.default;
            let data = yield parser.parse(url);
            Object.keys(data).forEach((key) => {
                this.cache.set(key, this.parseNode(data[key]));
            });
        });
    }
    parseNode(obj) {
        let value = obj["value"];
        let childRelations = [];
        if (obj["hasChildRelation"] !== undefined) {
            childRelations = obj["hasChildRelation"].map((obj) => {
                return new ChildRelation_1.default(obj["child"], obj["type"]);
            });
        }
        let members = obj.hasOwnProperty("member") ? obj["member"] : [];
        let totalItems = obj.hasOwnProperty("totalItems") ? Number(obj["totalItems"]) : NaN;
        return new Node_1.default(value, childRelations, members, totalItems);
    }
}
exports.default = NodeCache;
//# sourceMappingURL=NodeCache.js.map