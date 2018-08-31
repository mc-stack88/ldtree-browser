import ChildRelation from "./ChildRelation";
export default class Node {
    private readonly value;
    private readonly childRelations;
    private readonly members;
    private readonly totalItems;
    constructor(value: any, childRelations: Array<ChildRelation>, members: Array<string>, totalItems: number);
    getValue(): any;
    getChildRelations(): Array<ChildRelation>;
    getMembers(): Array<object>;
    getTotalItems(): number;
}
