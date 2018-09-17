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
const ldfetch = require("ldfetch");
const TreeCache_1 = __importDefault(require("./cache/TreeCache"));
/**
 * Class used to fetch tree nodes and members
 */
class TreeFetcher {
    constructor(maxSubjects, maxAge) {
        // Create node cache
        this.treeCache = new TreeCache_1.default(maxSubjects, maxAge);
        this.fetch = new ldfetch({});
    }
    getNode(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.treeCache.getNode(id);
        });
    }
    getMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.treeCache.getMember(id);
        });
    }
    getCollection(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.treeCache.getCollection(id);
        });
    }
    getChildRelation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.treeCache.getChildRelation(id);
        });
    }
    fillNode(node) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.treeCache.fillNode(node);
        });
    }
    static getInstance(maxSubjects, maxAge) {
        if (!TreeFetcher.instance) {
            TreeFetcher.instance = new TreeFetcher(maxSubjects, maxAge);
        }
        return TreeFetcher.instance;
    }
}
exports.default = TreeFetcher;
//# sourceMappingURL=TreeFetcher.js.map