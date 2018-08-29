import LRU = require('lru-cache');
import Node from "../../tree/Node";
import ChildRelation from "../../tree/ChildRelation";
import TreeParser from "../TreeParser";

export default class NodeCache {

    private cache: LRU.Cache<string, Node>;

    public constructor (maxNodes: number) {
        this.cache = new LRU<string, Node>({
            max: maxNodes,
            maxAge: 1000 * 60 * 60,
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
        Object.keys(data).forEach((key) => {
            this.cache.set(key, this.parseNode(data[key]));
        })
    }

    private parseNode(obj: object): Node {
        let value = obj["value"];

        let childRelations = [];
        if (obj["hasChildRelation"] !== undefined) {
            childRelations = obj["hasChildRelation"].map((obj) => {
                return new ChildRelation(obj["child"], obj["type"]);
            })
        }

        let members = obj["member"] !== undefined ? obj["member"] : [];
        let totalItems = obj["totalItems"] !== undefined ? obj["totalItems"] : NaN;

        return new Node(value, childRelations, members, totalItems);
    }
}