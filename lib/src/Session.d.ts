import Node from "./tree/Node";
export default class Session {
    nodes: Array<Node>;
    context: Array<Object>;
    constructor(nodes: Array<Node>);
    isEmpty(): boolean;
    getLength(): number;
    getNodes(): Array<Node>;
}
