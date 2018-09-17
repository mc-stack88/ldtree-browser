import RelationType from "./RelationType";
import Node from './Node';
export default class ChildRelation {
    private readonly children;
    private readonly relationTypes;
    /**
     * Constructor for the ChildRelations.
     * @param children - Child nodes of this relation.
     * @param relationTypes - Relation type of this relation.
     */
    constructor(children: Array<string>, relationTypes: Array<RelationType>);
    /**
     * Fetches the children from the cache and returns them (children might not be fully loaded)
    */
    getChildren(): Promise<Array<Node>>;
    /**
     * returns the relation type
    */
    getRelationType(): Array<RelationType>;
}
