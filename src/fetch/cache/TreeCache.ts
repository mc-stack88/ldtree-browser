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

    public constructor(maxSubjects?: number, maxAge?: number) {
        if (maxSubjects === undefined) {
            maxSubjects = 5000;
        }

        if (maxAge === undefined) {
            maxAge = 1000 * 60;
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
        // console.log("getNode", id)
        await Promise.all(this.runningPromises);
        let found = this.tripleCache.peek(id);

        if (!found){
            let triples = this.fetchTriples(id);
            this.runningPromises.push(triples);
            return this.parser.parseNode(await triples);
        } else {
            let triples = this.tripleCache.get(id);
            // console.log(triples)
            try {
                let result = this.parser.parseNode(triples);
                return result
            } catch (err) {
                let triples = this.fetchTriples(id);
                this.runningPromises.push(triples);
                return this.parser.parseNode(await triples);
            }
        }
    }

    public async getMember(id: string): Promise<Array<object>> {
        // console.log("getmember", id)

        await Promise.all(this.runningPromises);
        let found = this.tripleCache.peek(id);

        if (!found){
            let triples = this.fetchTriples(id);
            this.runningPromises.push(triples);
            return this.parser.parseMember(await triples);
        } else {
            let triples = this.tripleCache.get(id);
            // console.log("MEMBERS")
            // console.log(triples)
            try {
                let result = this.parser.parseMember(triples);
                // console.log("Members")
                // console.log(result)
                return result
            } catch (err) {
                let triples = this.fetchTriples(id);
                this.runningPromises.push(triples);
                return this.parser.parseMember(await triples);
            }
        }
    }

    public async getChildRelation(id: string): Promise<ChildRelation> {
        // console.log("getrelations", id)

        await Promise.all(this.runningPromises);
        let found = this.tripleCache.peek(id);

        if (!found){
            let triples = this.fetchTriples(id);
            this.runningPromises.push(triples);
            return this.parser.parseChildRelation(await triples);
        } else {
            let triples = this.tripleCache.get(id);
            try {
                let result = this.parser.parseChildRelation(triples);
                // console.log("Relations")
                // console.log(result)
                return result
            } catch (err) {
                let triples = this.fetchTriples(id);
                this.runningPromises.push(triples);
                return this.parser.parseChildRelation(await triples);
            }
        }
    }

    public async getCollection(id: string): Promise<Collection> {
        // console.log("getCollections", id)

        await Promise.all(this.runningPromises);
        let found = this.tripleCache.peek(id);

        if (!found){
            let triples = await this.fetchTriples(id);
            this.runningPromises.push(triples);
            return this.parser.parseCollection(triples);
        } else {
            let triples = this.tripleCache.get(id);
            try {
                let result = this.parser.parseCollection(triples);
                // console.log("Collection")
                // console.log(result)
                return result
            } catch (err) {
                let triples = await this.fetchTriples(id);
                this.runningPromises.push(triples);
                return this.parser.parseCollection(triples);
            }
        }
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
            }
        });
        return result;
    }
}