import SingleQuery from './SingleQuery';
import Condition from '../condition/Condition';
import StringContainsCondition from '../condition/StringContainsCondition';
import Session from '../Session';
import Node from '../tree/Node';
import ChildRelation from '../tree/ChildRelation';
import OrCondition from '../condition/OrCondition';
import StringContainedCondition from '../condition/StringContainedCondition';
import StringContainedSaveCondition from '../condition/StringContainedSaveCondition';
import Query from './Query';

export default class SearchStringQuery extends SingleQuery{

    query(): Promise<Session> {
        throw new Error("Method not implemented.");
    }
    followCondition: Condition;

    constructor(session:Session,
        searchstring: string)
        {
            //TODO:: FIX THIS, NOT CORRECT, DONE TO STOP TYPING ERRORS
        super()
        this.set
        this.followCondition = new OrCondition(new StringContainsCondition(), new StringContainedCondition());
        // super.setNodeContext(searchstring);
        // super.setnodeContextUpdateActionAction(function(node: Node, relation: ChildRelation, child: Node, nodeContext){
        //     if (child.getValue().length < searchstring.length){ 
        //         return nodeContext.slice(child.getValue().length) 
        //         }
        //         return "";
        //     })

    }
}

