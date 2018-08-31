import Node from "../tree/Node";
import NodeCache from "./cache/NodeCache";
import ldfetch = require('ldfetch');
import TreeParser from "./TreeParser";
import Collection from "../tree/Collection";

/**
 * Class used to fetch tree nodes and members
 */
export default class TreeFetcher {

    private static instance: TreeFetcher;

    private nodeCache: NodeCache;
    private fetch;

    private constructor () {
        // Create node cache
        this.nodeCache = new NodeCache(10000);
        this.fetch = new ldfetch({});
    }

    public async getNode(id: string): Promise<Node> {
        return this.nodeCache.get(id);
    }

    public async getMember(id: string): Promise<object> {
        let response = await this.fetch.get(id);
        let framed = await this.fetch.frame(response.triples, { '@id': id });
        return framed["@graph"][0];
    }

    public async getCollection(id: string): Promise<Collection> {
        let parser = new TreeParser;
        let data = await parser.parse(id);
        data = data.collections;

        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let obj = data[key];
            if (key === id && obj.hasOwnProperty("http://www.w3.org/1999/02/22-rdf-syntax-ns#type") && obj["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"].includes("http://www.w3.org/ns/hydra/core#Collection")) {
                let manages = obj.hasOwnProperty("http://www.w3.org/ns/hydra/core#manages") ? obj["http://www.w3.org/ns/hydra/core#manages"] : [];
                let members = obj.hasOwnProperty("http://www.w3.org/ns/hydra/core#member") ? obj["http://www.w3.org/ns/hydra/core#member"] : [];
                let totalItems = obj.hasOwnProperty("http://www.w3.org/ns/hydra/core#totalItems") ? Number(obj["http://www.w3.org/ns/hydra/core#totalItems"]) : NaN;
                let view = obj.hasOwnProperty("http://www.w3.org/ns/hydra/core#view") ? obj["http://www.w3.org/ns/hydra/core#view"] : [];

                return new Collection(manages, totalItems, members, view);
            }
        }
        throw "No collection found";
    }

    public static getInstance() {
        if (!TreeFetcher.instance) {
            TreeFetcher.instance = new TreeFetcher();
        }
        return TreeFetcher.instance;
    }

}