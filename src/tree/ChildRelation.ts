import RelationType from "./RelationType";
import Node from './Node';

export default class ChildRelation {

    private readonly children: Array<Node>;
    private readonly relationTypes: Array<RelationType>;

    public constructor(children: Array<Node>, relationTypes: Array<RelationType>) {
        this.children = children;
        this.relationTypes = relationTypes;
    }

    public getChildren(): Array<Node> {
        return this.children;
    }

    public getRelationType(): Array<RelationType> {
        return this.relationTypes;
    }

}