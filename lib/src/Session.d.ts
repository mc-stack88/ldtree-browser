import Node from "./tree/Node";
export default class Session {
    nodes: Array<Node>;
    constructor(nodes: Array<Node>);
    is_empty(): boolean;
}
