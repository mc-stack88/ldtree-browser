import LRU = require('lru-cache');
import Node from "../../tree/Node";
import ChildRelation from "../../tree/ChildRelation";
import Collection from "../../tree/Collection";
import TripleParser from "../helpers/TripleParser";
import TripleFetcher from "../helpers/TripleFetcher";

export default class TreeCache {

    private tripleCache: LRU.Cache<string, Array<object>>;
    private parser: TripleParser;
    private fetcher: TripleFetcher;
    private runningPromises;
    private notFullyLoadedIds = new Set()

    public constructor(maxSubjects?: number, maxAge?: number) {
        if (maxSubjects === undefined) {
            maxSubjects = 5000;
        }

        if (maxAge === undefined) {
            maxAge = 1000 * 300; // 5 min
        }

        this.parser = new TripleParser();
        this.fetcher = new TripleFetcher();

        this.tripleCache = new LRU<string, Array<object>>({
            max: maxSubjects,
            maxAge: maxAge,
            stale: true,
            noDisposeOnSet: true,
        });

        this.runningPromises = [];
    }

    public async getNode(id: string): Promise<Node> {
        await Promise.all(this.runningPromises);
        // console.log("getting node", id)
        let found = this.tripleCache.peek(id);

        if (!found){
            let triples = this.fetchTriples(id);
            // console.log(1)
            this.runningPromises.push(triples);
            let result = this.parser.parseNode(await triples, id);
            // set if a node is fully loaded
                result.setFullyLoaded(true);
            return result;
        } else {
            let triples = this.tripleCache.get(id);
            try {
                let result = this.parser.parseNode(triples, id);
                // set if a node is fully loaded
                result.setFullyLoaded(! this.notFullyLoadedIds.has(id));
                return result
            } catch (err) {
                let triples = this.fetchTriples(id);
                // console.log(2)
                // console.log(err)
                this.runningPromises.push(triples);
                let result = this.parser.parseNode(await triples, id);
                // set if a node is fully loaded
                result.setFullyLoaded(true);
                return result;
            }
        }
    }

    public async getMember(id: string): Promise<Array<object>> {

        await Promise.all(this.runningPromises);
        let found = this.tripleCache.peek(id);

        if (!found){
            let triples = this.fetchTriples(id);
            // console.log(3)
            this.runningPromises.push(triples);
            return this.parser.parseMember(await triples);
        } else {
            let triples = this.tripleCache.get(id);
            try {
                let result = this.parser.parseMember(triples);
                return result
            } catch (err) {
                let triples = this.fetchTriples(id);
                // console.log(4)
                this.runningPromises.push(triples);
                return this.parser.parseMember(await triples);
            }
        }
    }

    public async getChildRelation(id: string): Promise<ChildRelation> {
        await Promise.all(this.runningPromises);
        let found = this.tripleCache.peek(id);

        if (!found){
            let triples = this.fetchTriples(id);
            // console.log(5)
            this.runningPromises.push(triples);
            return this.parser.parseChildRelation(await triples);
        } else {
            let triples = this.tripleCache.get(id);
            try {
                let result = this.parser.parseChildRelation(triples);
                return result
            } catch (err) {
                let triples = this.fetchTriples(id);
                // console.log(6)
                this.runningPromises.push(triples);
                return this.parser.parseChildRelation(await triples);
            }
        }
    }

    public async getCollection(id: string): Promise<Collection> {
        await Promise.all(this.runningPromises);
        let found = this.tripleCache.peek(id);

        if (!found){
            let triples = this.fetchTriples(id);
            // console.log(7)
            this.runningPromises.push(triples);
            return this.parser.parseCollection(await triples);
        } else {
            let triples = this.tripleCache.get(id);
            try {
                let result = this.parser.parseCollection(triples);
                return result
            } catch (err) {
                let triples = await this.fetchTriples(id);
                // console.log(8)
                this.runningPromises.push(triples);
                return this.parser.parseCollection(triples);
            }
        }
    }

    public async fillNode(node: Node){
        await Promise.all(this.runningPromises);
        // Check if state has changed after all runnning processes have finished
        if (node.fullyloaded === true){ 
            return node;
        }
        let triples = this.fetchTriples(node.getId());
        // console.log(9, node.id)
        this.runningPromises.push(triples);
        let result = await this.parser.parseNode(await triples, node.getId());
        // set if a node is fully loaded
        result.setFullyLoaded(true);
        node.copyInfo(result)
        return node;
    }

    // Use flag to indicate nodes that are not from this fragment and may therefore be not completely loaded
    private async fetchTriples(id: string): Promise<Array<Object>> {
        let result = undefined;
        let triples = await this.fetcher.getTriplesBySubject(id);
        let keys = Object.keys(triples);
        keys.forEach((key) => {
            if (key.split("#")[0] === id.split("#")[0]) {
                if (id === key) {
                    result = triples[key];
                }
                this.tripleCache.set(key, triples[key]);
            } else {
                if (! this.tripleCache.peek(key)){
                    this.notFullyLoadedIds.add(key)
                    this.tripleCache.set(key, triples[key]);
                }
            }
        });
        return result;
    }
}