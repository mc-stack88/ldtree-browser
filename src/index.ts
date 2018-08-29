import ldfetch = require('ldfetch');


main();
async function main() {
    try {
        let url = 'https://datapiloten.be/bikes/data/d10.jsonld';
        let fetch = new ldfetch({}); //options: allow to add more headers if needed
        let response = await fetch.get(url);
        for (let i = 0; i < response.triples.length; i ++) {
            let triple = response.triples[i];
            if (triple.subject.value === response.url && triple.predicate.value === 'http://www.w3.org/ns/hydra/core#next') {
                console.error('The next page is: ', triple.object.value);
            }
        }
        fetch.frame(response.triples, { }).then(object => {
            console.error(object);
        });
    } catch (e) {
        console.error(e);
    }
}


