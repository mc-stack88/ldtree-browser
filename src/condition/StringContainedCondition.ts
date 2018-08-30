import Condition from './Condition';
import ChildRelation from '../tree/ChildRelation';
import Node from '../tree/Node';

export default class StringContainedCondition implements Condition {
    check_condition(node:Node, relation:ChildRelation, child:Node, iterationValue) {
        if (child.getValue().startsWith(iterationValue)){
            return true;
        } 
        return false; 
    }
}