import ChildRelation from "./ChildRelation";
import TreeFetcher from "../fetch/TreeFetcher";

export default class Node {

    private readonly value: any;
    private readonly childRelations: Array<ChildRelation>;
    private readonly members: Array<string>;
    private readonly totalItems: number;

    public constructor(value: any, childRelations: Array<ChildRelation>, members: Array<string>, totalItems: number) {
        if (value === undefined) {
            throw "Invalid node";
        }

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

    public getMembers(): Array<object> {
        let fetcher = TreeFetcher.getInstance();
        return this.members.map((id) => {
            return fetcher.getMember(id);
        });
    }

    public getTotalItems(): number {
        return this.totalItems;
    }
}