export default class Collection {

    private readonly manages: Array<string>;
    private readonly totalItems: number;
    private readonly members: Array<any>;
    private readonly views: Array<string>;

    public constructor(manages: Array<string>, totalItems: number, members: Array<any>, views: Array<string>) {
        this.manages = manages;
        this.totalItems = totalItems;
        this.members = members;
        this.views = views;
    }

    public getManaged(): Array<string> {
        return this.manages;
    }

    public getTotalItems(): number {
        return this.totalItems;
    }

    public getMembers(): Array<any> {
        return this.members;
    }

    public getViews(): Array<string> {
        return this.views;
    }

}