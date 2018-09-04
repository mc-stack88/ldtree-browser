import ChildRelation from "./ChildRelation";
export default class Node {
    private readonly value;
    private readonly childRelations;
    private readonly members;
    private readonly totalItems;
    constructor(value: any, childRelations: Array<string>, members: Array<string>, totalItems: number);
    getValue(): any;
    getChildRelations(): Promise<Array<ChildRelation>>;
    getMembers(): Promise<Array<Array<object>>>;
    getTotalItems(): number;
}
