"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TreeFetcher_1 = __importDefault(require("../fetch/TreeFetcher"));
class Node {
    constructor(value, childRelations, members, totalItems) {
        this.value = value;
        this.childRelations = childRelations;
        this.members = members;
        this.totalItems = totalItems;
    }
    getValue() {
        return this.value;
    }
    getChildRelations() {
        return this.childRelations;
    }
    getMembers() {
        let fetcher = TreeFetcher_1.default.getInstance();
        return this.members.map((id) => {
            return fetcher.getMember(id);
        });
    }
    getTotalItems() {
        return this.totalItems;
    }
}
exports.default = Node;
//# sourceMappingURL=Node.js.map