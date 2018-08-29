import ChildRelation from "./ChildRelation";

export default class Node {

    private readonly value: any;
    private readonly childRelations: Array<ChildRelation>;
    private readonly members: Array<string>;
    private readonly totalItems: number;

    public constructor(value: any, childRelations: Array<ChildRelation>, members: Array<string>, totalItems: number) {
        this.value = value;
        this.childRelations = childRelations;
        this.members = members;
        this.totalItems = totalItems;
    }

    public getValue(): any {
        return this.value;
    }

    public getChildRelations(): Array<ChildRelation> {
        return this.childRelations;
    }

    public getMembers(): Array<string> {
        return this.members;
    }

    public getTotalItems(): number {
        return this.totalItems;
    }
}