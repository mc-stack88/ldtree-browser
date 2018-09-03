import Condition from "../condition/Condition";
import Query from './Query';
import Session from '../Session';
import Node from '../tree/Node';
import SaveCondition from '../condition/SaveCondition';
import FollowCondition from '../condition/FollowCondition';

export default abstract class SingleQuery extends Query{
    saveCondition: Condition;
    followCondition: Condition;
    iterationValue;
    iterationAction;

    constructor(saveCondition: SaveCondition, followCondition: FollowCondition ){
        super();
        this.saveCondition = saveCondition;
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
    
    
    async query(){
        let nodelist = await this.queryRecursive(this.session.nodes, this.iterationValue);
        //TODO:: put the nodes in the nodelist on top of the starting nodes they originate from and return like this as new state for the session.
        return new Session(nodelist);
    }

    private async emitMember(node){
        console.log("emitmember")
        console.log(node)
        let members = await node.getMembers();
        for (var member of members){
            if (Object.keys(member).length !== 0){
                this.emit("member", member)
            }
        }
    }  
    private async emitNode(node){
        this.emit("node", node)
    }

    private async queryRecursive(nodes:Array<Node>, iterationValue):Promise<Node[]>{

        let followed_children = [];
        let saved_nodes = new Array<Node>();

        for (var node of nodes){""
            if (this.saveCondition.check_condition(node, iterationValue)){
                this.emitMember(node);
                this.emitNode(node);
                let childRelations = await node.getChildRelations();
                if (childRelations.length == 0){
                    saved_nodes.push(node)
                    this.emit("leafnode", node)
                }
            }
            let childRelations = await node.getChildRelations();
            for (var relation of childRelations){
                for (var child of await relation.getChildren()){
                    if (this.followCondition.check_condition(node, relation, child, iterationValue)){
                        followed_children.push([node, relation, child])
                    }
                }
            }
        }   


        for (var noderelationchildarray of followed_children){
            let newIterationValue = iterationValue
            if (this.iterationAction != null && iterationValue != null){
                newIterationValue = this.iterationAction(node, relation, child, iterationValue);
            }
            let finished_nodes = await this.queryRecursive([noderelationchildarray[2]], newIterationValue);
            saved_nodes = saved_nodes.concat(finished_nodes);
        }
        if (saved_nodes.length == 0){
            // IDEA:: HERE WE PUBLISH THE MEMBERS IN THIS NODE
            return nodes;
        }
        return saved_nodes.concat()

    }
}

