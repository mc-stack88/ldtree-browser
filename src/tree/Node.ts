import ChildRelation from "./ChildRelation";
import TreeFetcher from "../fetch/TreeFetcher";

export default class Node {

    readonly value: any;
    childRelations: Array<string>;
    members: Array<string>;
    totalItems: number;
    readonly id: string;

    fullyloaded: boolean;

    public constructor(id: string, value: any, childRelations: Array<string>, members: Array<string>, totalItems: number) {
        if (value === undefined) {
            throw "Invalid node";
        }

        this.id = id;
        this.value = value;
        this.childRelations = childRelations;
        this.members = members;
        this.totalItems = totalItems;
        this.fullyloaded = true;
    }

    public getId(): string {
        return this.id;
    }

    public getValue(): any {
        return this.value;
    }

    public async getChildRelations(): Promise<Array<ChildRelation>> {
        let fetcher = TreeFetcher.getInstance();
        let result = [];

        if (this.childRelations.length === 0){
            if (this.fullyloaded === false){
                await fetcher.fillNode(this);
                return this.getChildRelations();
            } else {
                return []
            }
        } else {
            for (let i = 0; i < this.childRelations.length; i++) {
                let node = await fetcher.getChildRelation(this.childRelations[i]);
                result.push(node);
            }
    
            return result;
        }        
    }

    public setFullyLoaded(loaded: boolean){
        this.fullyloaded = loaded;
    }

    public async getMembers(): Promise<Array<Array<object>>> {
        let fetcher = TreeFetcher.getInstance();
        let result = [];

        if (this.childRelations.length === 0){
            if (this.fullyloaded === false){
                await fetcher.fillNode(this);
                return this.getMembers();
            } else {
                return []
            }
        } else {
            for (let i = 0; i < this.members.length; i++) {
                let node = await fetcher.getMember(this.members[i]);
                result.push(node);
            }
        }

        return result;
    }

    public async getTotalItems(): Promise<number> {

        if (this.totalItems === undefined || this.totalItems === null){
            if (this.fullyloaded === false){
                let fetcher = TreeFetcher.getInstance();
                await fetcher.fillNode(this);
                return this.totalItems
            } else {
                return 0
            }
        } else {
           return this.totalItems;
        }
    }

    public copyInfo(node){
        // id and value are already set.
        // The fullyloaded parameter is set in the calling method.
        this.childRelations = node.childRelations
        this.members = node.members
        this.totalItems = node.totalItems
        this.fullyloaded = node.fullyloaded 
    }

}