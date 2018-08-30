import tree_parser = require('ldtree-parser');


main();
async function main() {
    try {
        let url = "https://datapiloten.be/patriciastreets/fragment1.jsonld";
        let response = await tree_parser.parse_tree(url); //options: allow to add more headers if needed
        
        console.log(response)

        for (var key in Object.keys(response)){
            console.log(response[key])
            if (response[key]["https://w3id.org/tree#hasChildRelation"]){
                console.log(response[key]["https://w3id.org/tree#hasChildRelation"])
            }

        }
    } catch (e) {
        console.error(e);
    }
}


