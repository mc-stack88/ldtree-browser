import Session from './Session';
import Collection from "./tree/Collection";
import Query from "./query/Query";
import TreeFetcher from "./fetch/TreeFetcher";

// TODO: keep some kind of state for backpropagation

/**
 * Used to create sessions and query them, has an internal node cache and is used to fetch nodes and execute queries
 */
export default class TreeClient {

    private collections: { [key:string]:Collection; };

    public constructor () {
        this.collections = {};
    }

    public async addCollection(url: string): Promise<void> {
        // Request and parse
        let collection = await TreeFetcher.getInstance().getCollection(url);
        this.collections[url] = collection;
    }

    public deleteCollection(url: string): void {
        delete this.collections[url];
    }

    private async createSession(): Promise<Session> {
        let nodes = [];
        let keys = Object.keys(this.collections);

        for (let i = 0; i < keys.length; i++) {
            let collectionNodes = await this.collections[keys[i]].getViews();
            nodes = nodes.concat(collectionNodes);

        }

        return new Session(nodes);
    }

    public async executeQuery(query: Query, session: Session = null) {

        
        // TODO: Pass fetcher to query
        if (session === null){
            session = await this.createSession();
        }

        query.set_session(session);
        console.log("querying with", session)

        return await query.query();
        
        
    }

}