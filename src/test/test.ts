import TreeClient from '../TreeClient';
import SearchStringQuery from '../query/SearchStringQuery';

main();
async function main() {
    let treeclient = new TreeClient();
    await treeclient.addCollection("https://amoryhoste.com/bikes/stations.jsonld");
    // let query = new LocationQuery("POLYGON ((3 50, 3 52, 5 52, 5 50 , 3 50))")
    let query = new SearchStringQuery()
    
}