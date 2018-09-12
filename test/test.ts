import TreeFetcher from "../src/fetch/TreeFetcher";
import TreeClient from '../src/TreeClient';
import SearchStringQuery from '../src/query/SearchStringQuery';
import Node from "../src/tree/Node";
import KNNQuery from '../src/query/KNNQuery';


main();
async function main() {

    var client = new TreeClient();
    await client.addCollection('https://dexagod.github.io/delijn/stoplocations.jsonld');
    let query = new KNNQuery(51.3, 3.42);
    query.on("node", function(node){console.log(node)})
    // stringQuery.on("member", function (member) {console.log(member)})
    let resultSession = await client.executeQuery(query)
    

    
    // console.log("SESSION")
    // console.log(resultSession)
    
    
    // let fetcher = TreeFetcher.getInstance();
    // let startTime = new Date();
    // let collection = await fetcher.getCollection('https://dexagod.github.io/collections/streetnames.jsonld');
    // console.log(collection);
    // let endTime = new Date();
    // console.error((endTime.getTime() - startTime.getTime()) + 'ms');

    // startTime = new Date();
    // let member = await fetcher.getMember('https://dexagod.github.io/streets/fragment1.jsonld');member
    // console.log(member)
    // endTime = new Date();
    // console.error((endTime.getTime() - startTime.getTime()) + 'ms');

    // startTime = new Date();
    // member = await fetcher.getMember('https://amoryhoste.com/bikes/data/d0.jsonld#3697');
    // endTime = new Date();
    // console.error((endTime.getTime() - startTime.getTime()) + 'ms');
    
    // let word = ""
    
    // let collection = await TreeFetcher.getInstance().getCollection('https://dexagod.github.io/collections/streetnames.jsonld');
    // console.log(collection)
    // let views = await collection.getViews();
    // console.log("VIEWS")
    // console.log(views)

    // let childRelation = await views[0].getChildRelations();
    // console.log("childRelation")
    // console.log(childRelation)
    // let child: Node[] = await childRelation[2].getChildren();
    // console.log("child")
    // console.log(child)
    // word += child[0].getValue()
    // childRelation = await child[0].getChildRelations()
    // console.log("childRelation")
    // console.log(childRelation)
    // child = await childRelation[0].getChildren();
    // console.log("child")
    // console.log(child)
    // word += child[0].getValue()
    // childRelation = await child[0].getChildRelations()
    // console.log("childRelation")
    // console.log(childRelation)
    // child = await childRelation[0].getChildren();
    // console.log("child")
    // console.log(child)
    // word += child[0].getValue()
    // console.log(word)
    // childRelation = await child.getChildRelations();
    // children = await childRelation[0].getChildren();
    // child = children[0];

    // childRelation = await child.getChildRelations();
    // children = await childRelation[0].getChildren();
    // child = children[0];
    // console.log(child);

    
    // /*
    // childRelation = await child[0].getChildRelations();
    // child = await childRelation[0].getChildren()[0];
    // console.log(child);
    // */



    // /*
    // let fetcher = new TreeFetcher();

    // let startTime = new Date();
    // let node = await fetcher.getNode('https://amoryhoste.com/bikes/tree/t0.jsonld#2687');
    // console.log(node);
    // let endTime = new Date();
    // console.error((endTime.getTime() - startTime.getTime()) + 'ms');

    // startTime = new Date();
    // let node2 = await fetcher.getNode('https://amoryhoste.com/bikes/tree/t0.jsonld#2687');
    // console.log(node2);
    // endTime = new Date();
    // console.error((endTime.getTime() - startTime.getTime()) + 'ms');
    // //et node2 = await fetcher.getNode()
    // */


    // /*
    // try {
    //     let url = 'https://amoryhoste.com/bikes/data/d0.jsonld#3697';
    //     let fetch = new ldfetch({}); //options: allow to add more headers if needed
    //     let response = await fetch.get(url);

    //     let startTime = new Date();
    //     let framed = await fetch.frame(response.triples, { });
    //     framed["@graph"].forEach((member) => {
    //         if (Object.keys(member).length > 1){
    //            console.log(member);
    //         }

    //         //console.log(member["@id"]);
    //     });
    //     let endTime = new Date();
    //     console.error((endTime.getTime() - startTime.getTime()) + 'ms');
    // } catch (e) {
    //     console.error(e);
    // }
    // */



}


