import RelationType from "./RelationType";
import Node from './Node';
export default class ChildRelation {
    private readonly children;
    private readonly relationTypes;
    constructor(children: Array<string>, relationTypes: Array<RelationType>);
    getChildren(): Promise<Array<Node>>;
    getRelationType(): Array<RelationType>;
}
