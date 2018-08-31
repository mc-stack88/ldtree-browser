import RelationType from "./RelationType";
import Node from './Node';
export default class ChildRelation {
    private readonly children;
    private readonly relationTypes;
    constructor(children: Array<Node>, relationTypes: Array<RelationType>);
    getChildren(): Array<Node>;
    getRelationType(): Array<RelationType>;
}
