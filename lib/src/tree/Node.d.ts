import ChildRelation from "./ChildRelation";
export default class Node {
    readonly value: any;
    childRelations: Array<string>;
    members: Array<string>;
    totalItems: number;
    readonly id: string;
    fullyloaded: boolean;
    /**
     * Node constructor
     * @param id
     * @param value
     * @param childRelations - Relations with the child.
     * @param members - Data objects contained by the node.
     * @param totalItems - Amount of nodes underneath this node in the tree.
     */
    constructor(id: string, value: any, childRelations: Array<string>, members: Array<string>, totalItems: number);
    getId(): string;
    getValue(): any;
    /**
     * Dependent on if the node was fully loaded, this can cause a fetch for a new page.
    */
    getChildRelations(): Promise<Array<ChildRelation>>;
    /**
     * Dependent on if the node was fully loaded, this can cause a fetch for a new page.
    */
    getMembers(): Promise<Array<Array<object>>>;
    /**
     * Returns total amount of nodes underneath this node in the tree.
    */
    getTotalItems(): Promise<number>;
    /**
     * Copies info from other node.
     * @param node - other node
     */
    copyInfo(node: any): void;
    /**
     * Sets the flag of the node being fully loaded (not provided in an other fragment as child without all data)
     * @param loaded
     */
    setFullyLoaded(loaded: boolean): void;
    /**
     * Checks node on being fully loaded
    */
    isFullyLoaded(): boolean;
}
