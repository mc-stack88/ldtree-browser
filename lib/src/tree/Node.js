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
    /**
     * Node constructor
     * @param id
     * @param value
     * @param childRelations - Relations with the child.
     * @param members - Data objects contained by the node.
     * @param totalItems - Amount of nodes underneath this node in the tree.
     */
    constructor(id, value, childRelations, members, totalItems) {
        if (value === undefined) {
            throw "Invalid node";
        }
        this.id = id;
        this.value = value;
        this.childRelations = childRelations;
        this.members = members;
        this.totalItems = totalItems;
        this.fullyloaded = true;
    }
    getId() {
        return this.id;
    }
    getValue() {
        return this.value;
    }
    /**
     * Dependent on if the node was fully loaded, this can cause a fetch for a new page.
    */
    getChildRelations() {
        return __awaiter(this, void 0, void 0, function* () {
            let fetcher = TreeFetcher_1.default.getInstance();
            let result = [];
            if (this.childRelations.length === 0) {
                if (this.fullyloaded === false) {
                    yield fetcher.fillNode(this);
                    return this.getChildRelations();
                }
                else {
                    return [];
                }
            }
            else {
                for (let i = 0; i < this.childRelations.length; i++) {
                    let node = yield fetcher.getChildRelation(this.childRelations[i]);
                    result.push(node);
                }
                return result;
            }
        });
    }
    /**
     * Dependent on if the node was fully loaded, this can cause a fetch for a new page.
    */
    getMembers() {
        return __awaiter(this, void 0, void 0, function* () {
            let fetcher = TreeFetcher_1.default.getInstance();
            let result = [];
            if (this.members.length === 0) {
                if (this.fullyloaded === false) {
                    yield fetcher.fillNode(this);
                    return this.getMembers();
                }
                else {
                    return [];
                }
            }
            else {
                for (let i = 0; i < this.members.length; i++) {
                    let node = yield fetcher.getMember(this.members[i]);
                    result.push(node);
                }
            }
            return result;
        });
    }
    /**
     * Returns total amount of nodes underneath this node in the tree.
    */
    getTotalItems() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.totalItems === undefined || this.totalItems === null) {
                if (this.fullyloaded === false) {
                    let fetcher = TreeFetcher_1.default.getInstance();
                    yield fetcher.fillNode(this);
                    return this.totalItems;
                }
                else {
                    return 0;
                }
            }
            else {
                return this.totalItems;
            }
        });
    }
    /**
     * Copies info from other node.
     * @param node - other node
     */
    copyInfo(node) {
        // id and value are already set.
        // The fullyloaded parameter is set in the calling method.
        this.childRelations = node.childRelations;
        this.members = node.members;
        this.totalItems = node.totalItems;
        this.fullyloaded = node.fullyloaded;
    }
    /**
     * Sets the flag of the node being fully loaded (not provided in an other fragment as child without all data)
     * @param loaded
     */
    setFullyLoaded(loaded) {
        this.fullyloaded = loaded;
    }
    /**
     * Checks node on being fully loaded
    */
    isFullyLoaded() {
        return this.fullyloaded;
    }
}
exports.default = Node;
//# sourceMappingURL=Node.js.map