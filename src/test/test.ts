import Node from '../tree/Node';
import ChildRelation from '../tree/ChildRelation';
import tree_parser = require('ldtree-parser');
import RelationType from '../tree/RelationType';
import Session from '../Session';
import StringSearchQuery from '../query/SearchStringQuery'

main();
function main() {
    let rootnode = create_data();
    let session = new Session([rootnode]);

    let query = new StringSearchQuery(session, "Gentbrug")

    console.log(query.query())
}



function create_data(): Node {
    // G e nt brugge
    // G e nt straat

    let node_brugge = new Node("brugge", null, null, 0);
    let children_ntbrugge = new ChildRelation([node_brugge], [RelationType.StringCompletesRelation])
    let node_straat = new Node("straat", null, null, 0);
    let children_ntstraat = new ChildRelation([node_straat], [RelationType.StringCompletesRelation])

    let node_nt = new Node("nt", [children_ntstraat, children_ntbrugge], null, 0);
    let children_e = new ChildRelation([node_nt], [RelationType.StringCompletesRelation])
    let node_e = new Node("e", [children_e], null, 0);
    let children_G = new ChildRelation([node_e], [RelationType.StringCompletesRelation])
    let node_G = new Node("G", [children_G], null, 0);
    let children_ = new ChildRelation([node_G], [RelationType.StringCompletesRelation])
    let node_ = new Node("", [children_], null, 0);

    return node_;

}

