import Node from "../tree/Node";
import Collection from "../tree/Collection";
import ChildRelation from "../tree/ChildRelation";
/**
 * Class used to fetch tree nodes and members
 */
export default class TreeFetcher {
    private static instance;
    private treeCache;
    private fetch;
    private constructor();
    getNode(id: string): Promise<Node>;
    getMember(id: string): Promise<object>;
    getCollection(id: string): Promise<Collection>;
    getChildRelation(id: string): Promise<ChildRelation>;
    fillNode(node: Node): Promise<Node>;
    static getInstance(maxSubjects?: number, maxAge?: number): TreeFetcher;
}
