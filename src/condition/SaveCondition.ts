import Condition from './Condition';

export default interface SaveCondition extends Condition {
    check_condition(node, iterationValue): boolean;
}