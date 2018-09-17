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
const TreeFetcher_1 = __importDefault(require("../fetch/TreeFetcher"));
class ChildRelation {
    /**
     * Constructor for the ChildRelations.
     * @param children - Child nodes of this relation.
     * @param relationTypes - Relation type of this relation.
     */
    constructor(children, relationTypes) {
        if (children.length < 1 || relationTypes.length < 1) {
            throw "Invalid childrelation";
        }
        this.children = children;
        this.relationTypes = relationTypes;
    }
    /**
     * Fetches the children from the cache and returns them (children might not be fully loaded)
    */
    getChildren() {
        return __awaiter(this, void 0, void 0, function* () {
            let fetcher = TreeFetcher_1.default.getInstance();
            let result = [];
            for (let i = 0; i < this.children.length; i++) {
                let node = yield fetcher.getNode(this.children[i]);
                result.push(node);
            }
            return result;
        });
    }
    /**
     * returns the relation type
    */
    getRelationType() {
        return this.relationTypes;
    }
}
exports.default = ChildRelation;
//# sourceMappingURL=ChildRelation.js.map