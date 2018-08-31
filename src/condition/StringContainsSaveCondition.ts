import Condition from './Condition';
import ChildRelation from '../tree/ChildRelation';
import Node from '../tree/Node';
import FollowCondition from './FollowCondition';
import SaveCondition from './SaveCondition';

export default class StringContainsSaveCondition implements SaveCondition {
    check_condition(node:Node, iterationValue) {
        if (iterationValue.startsWith(node.getValue())){
            return true;
        } 
        return false; 
    }
}