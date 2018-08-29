import Session from "./Session";
import Collection from "./tree/Collection";
import Query from "./query/Query";
import TreeFetcher from "./fetch/TreeFetcher";

// TODO: keep some kind of state for backpropagation

/**
 * Used to create sessions and query them, has an internal node cache and is used to fetch nodes and execute queries
 */
export default class TreeClient {

    private collections: { [key:string]:Collection; };
    private fetcher: TreeFetcher;

    public constructor () {
        this.collections = {};
        this.fetcher = new TreeFetcher();
    }

    public addCollection(url: string): void {
        // Request and parse
        this.collections[url] = new Collection(["gbfs:Station"], 10, [], ["http://example.com/root"]);
    }

    public deleteCollection(url: string): void {
        delete this.collections[url];
    }

    private createSession(): Session {
        let nodes = [].concat.apply([], Object.keys(this.collections).map(key=> this.collections[key]).map(col => col.getViews()));
        return new Session(nodes);
    }

    public createQuery(query: Query, session: Session) {
        /*
        // TODO: Pass fetcher to query
        if (session === null){
            return this.createSession();
        } else {
            let new_session = new Session(nodes);
            new_session.nodes = session.nodes;
        }
        */
    }

}