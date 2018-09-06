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
    updateNodeContext(nodeContext){
        this.nodeContext = nodeContext;
    }
    // THIS IS AN OPTIONAL VALUE THAT CAN BE EXECUTED EVERY QUERY CALL ON THE ITERATION VALUE
    updateNodeContextUpdateActionAction(action){
        this.nodeContextUpdateAction = action;
    }

    async query(){
        if (this.session["context"] === undefined || this.session["context"] === null){
            if (this.nodeContext === undefined || this.nodeContext === null){
                this.session["context"] = new Array(this.session.nodes.length);
            } else {
                this.session["context"] = this.nodeContext
            }
        }

        this.session["leafnodes"] = []
        this.session["leafcontext"] = []

        this.session = await this.queryRecursive(this.session);

        //TODO:: put the nodes in the nodelist on top of the starting nodes they originate from and return like this as new state for the session.
        
        this.session.nodes = this.session["leafnodes"]
        this.session.context = this.session["leafcontext"]
        delete this.session["leafnodes"]
        delete this.session["leafcontext"]

        return this.session;
    }

    async emitMember(node){
        let members = await node.getMembers();
        for (var member of members){
            if (Object.keys(member).length !== 0){
                this.emit("member", member)
            }
        }
    }  
    async emitNode(node){
        this.emit("node", node)
    }

    // This method returns an array of the form [ [node1, context1], [node2, context2], ... ]
    async queryRecursive(session):Promise<any>{

        let followedChildren = new Array<any>();
        for (var i = 0; i < session.getLength(); i++){
            let node = session.nodes[i]
            let currentContext = session.context[i];
            if (this.saveCondition.check_condition(node, currentContext)){
                this.emitMember(node);
                this.emitNode(node);
                let childRelations = await node.getChildRelations();
                if (childRelations.length == 0){
                    session["leafnodes"].push(node)
                    session["leafcontext"].push(currentContext)
                    this.emit("leafnode", node)
                }
            }
            for (var relation of await node.getChildRelations()){
                for (var child of await relation.getChildren()){
                    if (this.followCondition.check_condition(node, relation, child, currentContext)){
                        followedChildren.push([node, relation, child, currentContext])
                    }
                }
            }
        }   


        for (var nrccarray of followedChildren){
            if (this.nodeContextUpdateAction != null && [nrccarray[3]] != null){
                nrccarray[3] = this.nodeContextUpdateAction(nrccarray[0], nrccarray[1], nrccarray[2], nrccarray[3]);
            }
        }

        if (followedChildren.length == 0){
            return session;
        }

        session.nodes = []
        session.context = []
        for (var nrccarray of followedChildren){
            session.nodes.push(nrccarray[2])
            session.context.push(nrccarray[3])
        }
        return await this.queryRecursive(session);

    }
}

