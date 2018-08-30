import Node from "./tree/Node";
import Condition from './condition/Condition';

export default class Session {
    
    nodes: Array<Node>
    children: Array<Node>;

    public constructor(nodes: Array<Node>) {
        this.nodes = nodes;
    }

    is_empty(): boolean {
        return this.nodes.length == 0;
    }

}