import Node from "./Node";
export default class Collection {
    private readonly manages;
    private readonly totalItems;
    private readonly members;
    private readonly views;
    constructor(manages: Array<string>, totalItems: number, members: Array<any>, views: Array<string>);
    getManaged(): Array<string>;
    getTotalItems(): number;
    getMembers(): Array<any>;
    getViews(): Promise<Array<Node>>;
}
