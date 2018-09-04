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
class Node {
    constructor(value, childRelations, members, totalItems) {
        if (value === undefined) {
            throw "Invalid node";
        }
        this.value = value;
        this.childRelations = childRelations;
        this.members = members;
        this.totalItems = totalItems;
    }
    getValue() {
        return this.value;
    }
    getChildRelations() {
        return __awaiter(this, void 0, void 0, function* () {
            let fetcher = TreeFetcher_1.default.getInstance();
            let result = [];
            for (let i = 0; i < this.childRelations.length; i++) {
                let node = yield fetcher.getChildRelation(this.childRelations[i]);
                result.push(node);
            }
            return result;
        });
    }
    getMembers() {
        return __awaiter(this, void 0, void 0, function* () {
            let fetcher = TreeFetcher_1.default.getInstance();
            let result = [];
            for (let i = 0; i < this.members.length; i++) {
                let node = yield fetcher.getMember(this.members[i]);
                result.push(node);
            }
            return result;
        });
    }
    getTotalItems() {
        return this.totalItems;
    }
}
exports.default = Node;
//# sourceMappingURL=Node.js.map