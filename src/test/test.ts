import TripleFetcher from "../fetch/helpers/TripleFetcher";
import TripleParser from "../fetch/helpers/TripleParser";
import ItemType from "../fetch/helpers/ItemType";

main();
async function main() {
    /*
    let treeclient = new TreeClient();
    await treeclient.addCollection("https://amoryhoste.com/bikes/stations.jsonld");
    // let query = new LocationQuery("POLYGON ((3 50, 3 52, 5 52, 5 50 , 3 50))")
    let query = new LocationQuery("POLYGON((-100.63476562500001 44.24519901522129,-76.5966796875 44.24519901522129,-76.5966796875 32.21280106801518,-100.63476562500001 32.21280106801518,-100.63476562500001 44.24519901522129))")
    
    // let query = new LocationQuery("POLYGON ((54.827194631440356 -157.864418, 54.827194631440356 76.98793, -23.611846 76.98793, -23.611846 -157.864418))")
    let session = await treeclient.executeQuery(query);

    console.log(session)
    */

    let fetcher = new TripleFetcher();
    let result = await fetcher.getTriplesBySubject("https://amoryhoste.com/bikes/tree/t0.jsonld");
    let key = Object.keys(result)[0];

    let parser = new TripleParser();
    console.log(parser.parseChildRelation(result[key]));
    //console.log(JSON.stringify(result[key], null, 2));
}
