import Condition from "../condition/Condition";
import Query from './Query';
import Session from '../Session';
import Node from '../tree/Node';
import SaveCondition from '../condition/SaveCondition';
import FollowCondition from '../condition/FollowCondition';

export default abstract class SingleQuery extends Query{
    saveCondition: Condition;
    followCondition: Condition;
    nodeContext;
    nodeContextUpdateAction;

    constructor(saveCondition: SaveCondition, followCondition: FollowCondition ){
        super();
        this.saveCondition = saveCondition;
        this.followCondition = followCondition;
    }

    // THIS IS AN OPTIONAL VALUE THAT CAN BE SET FOR EVERY QUERY CALL
    setNodeContext(nodeContext){
        this.nodeContext = nodeContext;
    }
    // THIS IS AN OPTIONAL VALUE THAT CAN BE EXECUTED EVERY QUERY CALL ON THE ITERATION VALUE
    setNodeContextUpdateActionAction(action){
        this.nodeContextUpdateAction = action;
    }

    setStartingCondition(){

    }
    
    async query(){
        if (this.session["context"] === undefined || this.session["context"] === null){
            if (this.nodeContext === undefined || this.nodeContext === null){
                this.session["context"] = new Array(this.session.nodes.length);
            } else {
                this.session["context"] = this.nodeContext
            }
        }
        let result = await this.queryRecursive(this.session.nodes, this.session["context"]);
        let nodelist = []
        let context = []
        for (var value of result){
            nodelist.push(value[0])
            context.push(value[1])
        }
        //TODO:: put the nodes in the nodelist on top of the starting nodes they originate from and return like this as new state for the session.
        let session = new Session(nodelist);
        session["context"] = context
        return session;
    }

    private async emitMember(node){
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

    // This method returns an array of the form [ [node1, context1], [node2, context2], ... ]
    private async queryRecursive(nodes:Array<Node>, nodeContext):Promise<any>{

        let followed_children = [];
        let saved_nodes = new Array<any>();

        for (var i = 0; i < nodes.length; i++){
            let node = nodes[i]
            let currentContext = nodeContext[i];
            if (this.saveCondition.check_condition(node, currentContext)){
                this.emitMember(node);
                this.emitNode(node);
                let childRelations = await node.getChildRelations();
                if (childRelations.length == 0){
                    saved_nodes.push([node, currentContext])
                    this.emit("leafnode", node)
                }
            }
            let childRelations = await node.getChildRelations();
            for (var relation of childRelations){
                for (var child of await relation.getChildren()){
                    if (this.followCondition.check_condition(node, relation, child, currentContext)){
                        followed_children.push([node, relation, child, currentContext])
                    }
                }
            }
        }   


        for (var nrccarray of followed_children){
            let newnodeContext = [nrccarray[3]]
            if (this.nodeContextUpdateAction != null && [nrccarray[3]] != null){
                newnodeContext = this.nodeContextUpdateAction(nrccarray[0], nrccarray[1], nrccarray[2], nrccarray[3]);
            }
            let finished_nodes = await this.queryRecursive([nrccarray[2]], [newnodeContext]);
            saved_nodes = saved_nodes.concat(finished_nodes);
        }
        if (saved_nodes.length == 0){
            // IDEA:: HERE WE PUBLISH THE MEMBERS IN THIS NODE
            return [nodes, nodeContext];
        }
        return saved_nodes

    }
}

