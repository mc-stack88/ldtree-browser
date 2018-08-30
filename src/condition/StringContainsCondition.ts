import Condition from './Condition';
import ChildRelation from '../tree/ChildRelation';
import Node from '../tree/Node';

export default class StringContainsCondition implements Condition {
    check_condition(node:Node, relation:ChildRelation, child:Node, iterationValue) {
        if (iterationValue.startsWith(child.getValue())){
            return true;
        } 
        return false; 
    }
}