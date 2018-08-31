"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export default class ChildRelation {
//
//     private readonly children: Array<string>;
//     private readonly relationTypes: Array<RelationType>;
//
//     public constructor(children: Array<string>, relationTypes: Array<RelationType>) {
//         this.children = children;
//         this.relationTypes = relationTypes;
//     }
//
//     public async getChildren(): Promise<Array<Node>> {
//         let fetcher = TreeFetcher.getInstance();
//         let result = [];
//         for (let i = 0; i < this.children.length; i++) {
//             let node = await fetcher.getNode(this.children[i]);
//             result.push(node);
//         }
//
//         return result;
//     }
//
//     public getRelationType(): Array<RelationType> {
//         return this.relationTypes;
//     }
//
// }
class ChildRelation {
    constructor(children, relationTypes) {
        this.children = children;
        this.relationTypes = relationTypes;
    }
    getChildren() {
        return this.children;
    }
    getRelationType() {
        return this.relationTypes;
    }
}
exports.default = ChildRelation;
//# sourceMappingURL=ChildRelation.js.map