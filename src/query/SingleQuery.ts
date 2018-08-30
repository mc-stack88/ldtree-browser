import Condition from "../condition/Condition";
import Query from './Query';
import Session from '../Session';
import Node from '../tree/Node';

export default abstract class SingleQuery extends Query{
    // saveCondition: Condition;
    followCondition: Condition;
    removeconditions: Condition;
    iterationValue;
    iterationAction;

    constructor(session:Session, /*saveCondition: Condition,*/ followCondition: Condition){
        super(session);
        // this.saveCondition = saveCondition;
        this.followCondition = followCondition;
    }

    // THIS IS AN OPTIONAL VALUE THAT CAN BE SET FOR EVERY QUERY CALL
    set_iteration_value(iterationValue){
        this.iterationValue = iterationValue;
    }
    // THIS IS AN OPTIONAL VALUE THAT CAN BE EXECUTED EVERY QUERY CALL ON THE ITERATION VALUE
    set_iteration_action(action){
        this.iterationAction = action;
    }
    
    
    query(){
        let nodelist = this.queryRecursive(this.session.nodes, this.iterationValue);
        //TODO:: put the nodes in the nodelist on top of the starting nodes they originate from and return like this as new state for the session.
        return new Session(nodelist);
    }

    private queryRecursive(nodes:Array<Node>, iterationValue):Node[]{

        let followed_children = [];

        for (var node of nodes){
            for (var relation of node.getChildRelations()){
                for (var child of relation.getChildren()){
                    if (this.followCondition.check_condition(node, relation, child, iterationValue)){
                        followed_children.push([node, relation, child])
                    }
                }
            }
        }   

        let saved_nodes = new Array<Node>();

        for (var noderelationchildarray of followed_children){
            let newIterationValue = iterationValue
            if (this.iterationAction != null && iterationValue != null){
                newIterationValue = this.iterationAction(node, relation, child, iterationValue);
            }
            let finished_nodes = this.queryRecursive([noderelationchildarray[2]], newIterationValue);
            saved_nodes = saved_nodes.concat(finished_nodes);
        }
        if (saved_nodes.length == 0){
            // IDEA:: HERE WE PUBLISH THE MEMBERS IN THIS NODE
            return nodes;
        }
        return saved_nodes.concat()

    }
}