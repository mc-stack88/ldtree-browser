import RelationType from "./RelationType";
import Node from './Node';
import TreeFetcher from "../fetch/TreeFetcher";

export default class ChildRelation {

    private readonly children: Array<string>;
    private readonly relationTypes: Array<RelationType>;

    public constructor(children: Array<string>, relationTypes: Array<RelationType>) {
        this.children = children;
        this.relationTypes = relationTypes;
    }

    public async getChildren(): Promise<Array<Node>> {
        let fetcher = TreeFetcher.getInstance();
        let result = [];
        for (let i = 0; i < this.children.length; i++) {
            let node = await fetcher.getNode(this.children[i]);
            result.push(node);
        }

        return result;
    }

    public getRelationType(): Array<RelationType> {
        return this.relationTypes;
    }

}