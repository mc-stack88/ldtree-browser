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

    save(condition: Condition) : Array<Node>{
        return null;
    }


    follow(condition: Condition, iteration_value = null) : Array<Session> {
        let sessions = new Array<Session>();
        for (var node of this.nodes){
            for (var relation of node.getChildRelations()){
                for (var child of relation.getChildren()){
                if (condition.check_condition(node, relation, child, iteration_value)){
                    sessions.push(new Session([child]))
                }
            }
        }   
        return sessions;
    }

}