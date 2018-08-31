import Node from '../tree/Node';
import ChildRelation from '../tree/ChildRelation';
import tree_parser = require('ldtree-parser');
import RelationType from '../tree/RelationType';
import Session from '../Session';
import StringSearchQuery from '../query/SearchStringQuery'
import TreeFetcher from '../fetch/TreeFetcher';
import TreeClient from '../TreeClient';
import * as terraformer from 'terraformer'
import * as terraformerparser from 'terraformer-wkt-parser'
import LocationQuery from "../query/LocationQuery";

main();
async function main() {
    let treeclient = new TreeClient();
    await treeclient.addCollection("https://amoryhoste.com/bikes/stations.jsonld");
    let query = new LocationQuery("POLYGON ((52 8, 52 10, 50 10, 50 8 , 52 8))")
    // let query = new LocationQuery("POLYGON ((54.827194631440356 -157.864418, 54.827194631440356 76.98793, -23.611846 76.98793, -23.611846 -157.864418))")
    let session = await treeclient.executeQuery(query)

    console.log(session)
}
