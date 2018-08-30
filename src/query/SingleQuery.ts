import Condition from "../condition/Condition";
import Query from './Query';
import Session from '../Session';
import Node from '../tree/Node';

export default abstract class SingleQuery extends Query{
    saveCondition: Condition;
    followCondition: Condition;
    removeconditions: Condition;
    iterationValue;
    iterationAction;

    constructor(session:Session, saveCondition: Condition, followCondition: Condition, removeconditions: Condition){
        super(session);
        this.saveCondition = saveCondition;
        this.followCondition = followCondition;
        this.removeconditions = removeconditions;
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
        let nodelist = this.queryRecursive(this.session, this.iterationValue);
        //TODO:: put the nodes in the nodelist on top of the starting nodes they originate from and return like this as new state for the session.
        return new Session(this.session.nodes);
    }

    private queryRecursive(session:Session, iterationValue):Node[]{
        session = session.follow(this.followCondition);
        if (session.is_empty()){
            return ;
        }
        let saved_nodes = new Array<Node>();
        let t = this;
        session.save(this.saveCondition).forEach(element => {
            t.emit('data', element)
        });;
        session.remove(this.followCondition);

        // IF PASSED EXECUTE A GIVEN ACTION ON THE OPTIONAL ITERATION VALUE FIELD BEFORE IT IS USED IN THE NEXT ITERATION
        // THIS CAN BE USED TO INCREMENT / COPY THE OBJECT / EXECUTE A CALLBACK...
        if (this.iterationAction != null && this.iterationValue != null){
            this.iterationAction(this.iterationValue);
        }

        for (let node of session.nodes){
            // This call returns an array of the found nodes (first node is the last node found on the way).
            // The nodes are only returned if they have not been removed, so only the current state is logged with a backlog from the given state
            let node_stack = this.queryRecursive(new Session([node]), iterationValue);
            saved_nodes.concat();
        }
        return saved_nodes.concat()

    }
}