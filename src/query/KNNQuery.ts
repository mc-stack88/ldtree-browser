
var Queue = require('tinyqueue');
import SingleQuery from './SingleQuery';
import Condition from '../condition/Condition';
import Session from '../Session';
import Node from '../tree/Node';
import ChildRelation from '../tree/ChildRelation';
import OrCondition from '../condition/OrCondition';
import StringContainedCondition from '../condition/StringContainedCondition';
import StringContainsCondition from '../condition/StringContainsCondition';
import LocationContainedCondition from "../condition/LocationContainedCondition";
import LocationContainedSaveCondition from '../condition/LocationContainedSaveCondition';
import SkipSaveCondition from '../condition/SkipSaveCondition';
import KNNCondition from '../condition/KNNCondition';

export default class KNNQuery extends SingleQuery{
    followcondition: Condition;

    long;
    lat;

    constructor(long, lat, k = 3)
        {
            super(new SkipSaveCondition(), new KNNCondition(long, lat));
            this.long = long;
            this.lat = lat;
            this.updateNodeContext({long: long, lat: lat, minChildDist: 9007199254740991, k: k, currentQueue : new Queue()})
        }

        // This method returns an array of the form [ [node1, context1], [node2, context2], ... ]
        async queryRecursive(session):Promise<any>{
    
            let followed_children = [];
            let saved_nodes = new Array<any>();
    
            for (var i = 0; i < session.nodes.length; i++){
                let node = session.nodes[i]
                let currentContext = session.context[i];
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
    
    
            // for (var nrccarray of followed_children){
            //     let newnodeContext = [nrccarray[3]]
            //     if (this.nodeContextUpdateAction != null && [nrccarray[3]] != null){
            //         newnodeContext = this.nodeContextUpdateAction(nrccarray[0], nrccarray[1], nrccarray[2], nrccarray[3]);
            //     }
            //     let finished_nodes = await this.queryRecursive([nrccarray[2]], [newnodeContext]);
            //     saved_nodes = saved_nodes.concat(finished_nodes);
            // }
            // if (saved_nodes.length == 0){
            //     // IDEA:: HERE WE PUBLISH THE MEMBERS IN THIS NODE
            //     return [nodes, nodeContext];
            // }
            return saved_nodes
    
        }
    }
    
    