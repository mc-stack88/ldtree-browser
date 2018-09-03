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

    public constructor(maxSubjects?: number, maxAge?: number) {
        if (maxSubjects === undefined) {
            maxSubjects = 10000;
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
    }

    public async getNode(id: string): Promise<Node> {
        let found = this.tripleCache.peek(id);

        if (!found){
            let triples = await this.fetchTriples(id);
            return this.parser.parseNode(triples);
        } else {
            let triples = this.tripleCache.get(id);
            try {
                return this.parser.parseNode(triples);
            } catch (err) {
                let triples = await this.fetchTriples(id);
                return this.parser.parseNode(triples);
            }
        }
    }

    public async getMember(id: string): Promise<Array<object>> {
        let found = this.tripleCache.peek(id);

        if (!found){
            let triples = await this.fetchTriples(id);
            return this.parser.parseMember(triples);
        } else {
            let triples = this.tripleCache.get(id);
            try {
                return this.parser.parseMember(triples);
            } catch (err) {
                let triples = await this.fetchTriples(id);
                return this.parser.parseMember(triples);
            }
        }
    }

    public async getChildRelation(id: string): Promise<ChildRelation> {
        let found = this.tripleCache.peek(id);

        if (!found){
            let triples = await this.fetchTriples(id);
            return this.parser.parseChildRelation(triples);
        } else {
            let triples = this.tripleCache.get(id);
            try {
                return this.parser.parseChildRelation(triples);
            } catch (err) {
                let triples = await this.fetchTriples(id);
                return this.parser.parseChildRelation(triples);
            }
        }
    }

    public async getCollection(id: string): Promise<Collection> {
        let found = this.tripleCache.peek(id);

        if (!found){
            let triples = await this.fetchTriples(id);
            return this.parser.parseCollection(triples);
        } else {
            let triples = this.tripleCache.get(id);
            try {
                return this.parser.parseCollection(triples);
            } catch (err) {
                let triples = await this.fetchTriples(id);
                return this.parser.parseCollection(triples);
            }
        }
    }

    private async fetchTriples(id: string): Promise<Array<Object>> {
        let result = undefined;
        let triples = await this.fetcher.getTriplesBySubject(id);

        let keys = Object.keys(triples);
        keys.forEach((key) => {
            if (id === key) {
                result = triples[key];
            }
            this.tripleCache.set(key, triples[key]);
        });

        return result;
    }
}