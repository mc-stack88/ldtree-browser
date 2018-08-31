import Condition from './Condition';
import ChildRelation from '../tree/ChildRelation';
import Node from '../tree/Node';
import FollowCondition from './FollowCondition';
import SaveCondition from './SaveCondition';

export default class StringContainedSaveCondition implements SaveCondition {
    flag:string = "";
    check_condition(node:Node, iterationValue) {
        if (node.getValue().startsWith(iterationValue)){
            return true;
        } 
        return false; 
    }
}