import Node from "../tree/Node";
import NodeCache from "./cache/NodeCache";

export default class TreeFetcher {

    private nodeCache: NodeCache;

    public constructor () {
        // Create node cache
        this.nodeCache = new NodeCache(1000);
    }

    public async getNode(id: string): Promise<Node> {
        return this.nodeCache.get(id);
    }

}