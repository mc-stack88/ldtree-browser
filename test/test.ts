import ldfetch = require('ldfetch');
import TreeFetcher from "../src/fetch/TreeFetcher";
import TreeParser from "../src/fetch/TreeParser";
import TreeClient from "../src/TreeClient";
import Collection from "../src/tree/Collection";
import Node from '../src/tree/Node';

main();
async function main() {

    /*
    let parser = new TreeParser;

    let treeClient = new TreeClient();
    await treeClient.addCollection('https://amoryhoste.com/bikes/stations.jsonld');
    let collection = treeClient.collections[Object.keys(treeClient.collections)[0]];
    console.log(collection);
    let views = await collection.getViews();
    let node: Node = views[0];
    let nodes = await node.getChildRelations()[0].getChildren();
    console.log(nodes);
    */


    let fetcher = TreeFetcher.getInstance();
    let startTime = new Date();
    let member = await fetcher.getMember('https://amoryhoste.com/bikes/data/d0.jsonld#3697');
    console.log(member);
    let endTime = new Date();
    console.error((endTime.getTime() - startTime.getTime()) + 'ms');

    startTime = new Date();
    member = await fetcher.getMember('https://amoryhoste.com/bikes/data/d0.jsonld#3697');
    endTime = new Date();
    console.error((endTime.getTime() - startTime.getTime()) + 'ms');

    startTime = new Date();
    member = await fetcher.getMember('https://amoryhoste.com/bikes/data/d0.jsonld#3697');
    endTime = new Date();
    console.error((endTime.getTime() - startTime.getTime()) + 'ms');


    /*
    let fetcher = new TreeFetcher();

    let startTime = new Date();
    let node = await fetcher.getNode('https://amoryhoste.com/bikes/tree/t0.jsonld#2687');
    console.log(node);
    let endTime = new Date();
    console.error((endTime.getTime() - startTime.getTime()) + 'ms');

    startTime = new Date();
    let node2 = await fetcher.getNode('https://amoryhoste.com/bikes/tree/t0.jsonld#2687');
    console.log(node2);
    endTime = new Date();
    console.error((endTime.getTime() - startTime.getTime()) + 'ms');
    //et node2 = await fetcher.getNode()
    */


    /*
    try {
        let url = 'https://amoryhoste.com/bikes/data/d0.jsonld#3697';
        let fetch = new ldfetch({}); //options: allow to add more headers if needed
        let response = await fetch.get(url);

        let startTime = new Date();
        let framed = await fetch.frame(response.triples, { });
        framed["@graph"].forEach((member) => {
            if (Object.keys(member).length > 1){
               console.log(member);
            }

            //console.log(member["@id"]);
        });
        let endTime = new Date();
        console.error((endTime.getTime() - startTime.getTime()) + 'ms');
    } catch (e) {
        console.error(e);
    }
    */



}


