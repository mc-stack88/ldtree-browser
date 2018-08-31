import Node from "../tree/Node";
import Collection from "../tree/Collection";
/**
 * Class used to fetch tree nodes and members
 */
export default class TreeFetcher {
    private static instance;
    private nodeCache;
    private fetch;
    private constructor();
    getNode(id: string): Promise<Node>;
    getMember(id: string): Promise<object>;
    getCollection(id: string): Promise<Collection>;
    static getInstance(): TreeFetcher;
}
