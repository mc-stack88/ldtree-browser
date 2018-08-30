import Node from "../tree/Node";
import NodeCache from "./cache/NodeCache";
import ldfetch = require('ldfetch');

/**
 * Class used to fetch tree nodes and members
 */
export default class TreeFetcher {

    private nodeCache: NodeCache;
    private fetch;

    public constructor () {
        // Create node cache
        this.nodeCache = new NodeCache(10000);
        this.fetch = new ldfetch({});
    }

    public async getNode(id: string): Promise<Node> {
        return this.nodeCache.get(id);
    }

    public async getMember(id: string): Promise<object> {
        let response = await this.fetch.get(id);
        let framed = await this.fetch.frame(response.triples, { '@id': 'id' });
        return framed["@graph"][0];
    }

}