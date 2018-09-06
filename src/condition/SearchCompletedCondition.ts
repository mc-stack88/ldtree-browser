import SaveCondition from './SaveCondition';
import Node from '../tree/Node';
export default class SearchCompletedCondition implements SaveCondition {
    check_condition(node:Node,  nodeContext) {
        if (nodeContext["searchstring"] === ""){
            return true;
        }
        return false; 
    }
}