
export default interface Condition {
    check_condition(node, relation, child, iterationValue): boolean;
}