import Node from "./tree/Node";

export default class Session {

    nodes: Array<Node>;
    public constructor(nodes: Array<Node>) {
        this.nodes = nodes;
    }

    is_empty(): boolean {
        return this.nodes.length == 0;
    }

}