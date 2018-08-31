import SingleQuery from './SingleQuery';
import Condition from '../condition/Condition';
import StringContainsCondition from '../condition/StringContainsCondition';
import Session from '../Session';
import Node from '../tree/Node';
import ChildRelation from '../tree/ChildRelation';
import OrCondition from '../condition/OrCondition';
import StringContainedCondition from '../condition/StringContainedCondition';

export default class SearchStringQuery extends SingleQuery{
    followcondition: Condition;

    constructor(session:Session,
        searchstring: string)
        {
        super(new OrCondition(new StringContainsCondition(), new StringContainedCondition()));
        super.set_iteration_value(searchstring);
        super.set_iteration_action(function(node: Node, relation: ChildRelation, child: Node, iterationValue){
            if (child.getValue().length < searchstring.length){ 
                return iterationValue.slice(child.getValue().length) 
                }
                return "";
            })
        }
}

