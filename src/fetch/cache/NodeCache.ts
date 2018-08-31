import LRU = require('lru-cache');
import Node from "../../tree/Node";
import ChildRelation from "../../tree/ChildRelation";
import TreeParser from "../TreeParser";

export default class NodeCache {

    private cache: LRU.Cache<string, Node>;

    public constructor (maxNodes: number) {
        this.cache = new LRU<string, Node>({
            max: maxNodes,
            maxAge: 1000 * 60,
            stale: true,
            noDisposeOnSet: true,
        });
    }

    public async get(id: string): Promise<Node> {
        let found = this.cache.peek(id) !== undefined;

        if (!found) {
            await this.addToCache(id);
        }
        return this.cache.get(id);
    }

    private async addToCache(url: string): Promise<void> {
        let parser = new TreeParser;
        let data = await parser.parse(url);
        data = data.nodes;
        Object.keys(data).forEach((key) => {
            this.cache.set(key, this.parseNode(data[key]));
        })
    }

    private parseNode(obj: object): Node {
        let value = obj["https://w3id.org/tree#value"];

        let childRelations = [];
        if (obj["https://w3id.org/tree#hasChildRelation"] !== undefined) {
            childRelations = obj["https://w3id.org/tree#hasChildRelation"].map((obj) => {
                return new ChildRelation(obj["https://w3id.org/tree#child"], obj["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"]);
            });
        }

        let members = obj.hasOwnProperty("http://www.w3.org/ns/hydra/core#member") ? obj["http://www.w3.org/ns/hydra/core#member"] : [];
        let totalItems = obj.hasOwnProperty("http://www.w3.org/ns/hydra/core#totalItems") ? Number(obj["http://www.w3.org/ns/hydra/core#totalItems"]) : NaN;

        return new Node(value, childRelations, members, totalItems);
    }
}