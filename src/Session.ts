import Node from "./tree/Node";
import Condition from './condition/Condition';

export default class Session {
    
    nodes: Array<Node>
    public constructor(nodes: Array<Node>) {
        this.nodes = nodes;
    }

    is_empty(): boolean {
        return this.nodes.length == 0;
    }

    save(condition: Condition) : Array<Node>{
        return null;
    }


    follow(condition: Condition) : Session {
        return null;
    }

    remove(condition: Condition) : void{
        return null;
    }
}