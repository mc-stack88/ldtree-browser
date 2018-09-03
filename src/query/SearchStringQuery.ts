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

export default class SearchStringQuery extends Query{

    query(): Promise<Session> {
        throw new Error("Method not implemented.");
    }
    followCondition: Condition;

    constructor(session:Session,
        searchstring: string)
        {
            //TODO:: FIX THIS, NOT CORRECT, DONE TO STOP TYPING ERRORS
        super()
        this.followCondition = new OrCondition(new StringContainsCondition(), new StringContainedCondition());
        // super.set_iteration_value(searchstring);
        // super.set_iteration_action(function(node: Node, relation: ChildRelation, child: Node, iterationValue){
        //     if (child.getValue().length < searchstring.length){ 
        //         return iterationValue.slice(child.getValue().length) 
        //         }
        //         return "";
        //     })

    }
}

