import ChildRelation from "./ChildRelation";
import TreeFetcher from "../fetch/TreeFetcher";

export default class Node {

    private readonly value: any;
    private readonly childRelations: Array<string>;
    private readonly members: Array<string>;
    private readonly totalItems: number;

    private readonly fullyloaded: boolean;

    public constructor(value: any, childRelations: Array<string>, members: Array<string>, totalItems: number) {
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

    public async getChildRelations(): Promise<Array<ChildRelation>> {
        let fetcher = TreeFetcher.getInstance();
        let result = [];
        for (let i = 0; i < this.childRelations.length; i++) {
            let node = await fetcher.getChildRelation(this.childRelations[i]);
            result.push(node);
        }

        return result;
    }

    public async getMembers(): Promise<Array<Array<object>>> {
        let fetcher = TreeFetcher.getInstance();
        let result = [];
        for (let i = 0; i < this.members.length; i++) {
            let node = await fetcher.getMember(this.members[i]);
            result.push(node);
        }

        return result;
    }

    public getTotalItems(): number {
        return this.totalItems;
    }
}