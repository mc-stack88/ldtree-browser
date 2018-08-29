import RelationType from "./RelationType";

export default class ChildRelation {

    private readonly children: Array<string>;
    private readonly relationTypes: Array<RelationType>;

    public constructor(children: Array<string>, relationTypes: Array<RelationType>) {
        this.children = children;
        this.relationTypes = relationTypes;
    }

    public getChildren(): Array<string> {
        return this.children;
    }

    public getRelationType(): Array<RelationType> {
        return this.relationTypes;
    }

}