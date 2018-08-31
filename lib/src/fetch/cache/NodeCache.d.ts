import Node from "../../tree/Node";
export default class NodeCache {
    private cache;
    constructor(maxNodes: number);
    get(id: string): Promise<Node>;
    private addToCache;
    private parseNode;
}
