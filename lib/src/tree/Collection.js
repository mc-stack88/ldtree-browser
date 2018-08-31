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
class Collection {
    constructor(manages, totalItems, members, views) {
        this.manages = manages;
        this.totalItems = totalItems;
        this.members = members;
        this.views = views;
    }
    getManaged() {
        return this.manages;
    }
    getTotalItems() {
        return this.totalItems;
    }
    getMembers() {
        return this.members;
    }
    getViews() {
        return __awaiter(this, void 0, void 0, function* () {
            let fetcher = TreeFetcher_1.default.getInstance();
            let nodes = [];
            for (let i = 0; i < this.views.length; i++) {
                let node = yield fetcher.getNode(this.views[i]);
                nodes.push(node);
            }
            return nodes;
        });
    }
}
exports.default = Collection;
//# sourceMappingURL=Collection.js.map