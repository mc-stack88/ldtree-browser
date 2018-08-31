import Condition from './Condition';
import ChildRelation from '../tree/ChildRelation';
import Node from '../tree/Node';
import RelationType from '../tree/RelationType';
import * as terraformer from 'terraformer'
import * as terraformerparser from 'terraformer-wkt-parser'
import {Primitive} from "terraformer";
import {GeoJsonObject} from "geojson";

export default class LocationContainedCondition implements Condition {

    nodeprimitivepoly: Primitive<GeoJsonObject>;

    constructor(polygonwktstring: string){
        let nodepoly = terraformerparser.parse(polygonwktstring);
        this.nodeprimitivepoly = new terraformer.Primitive(nodepoly)
    }

    check_condition(node:Node, relation:ChildRelation, child:Node, iterationValue) {
        if (relation.getRelationType().indexOf(RelationType.GeospatiallyContainsRelation) != -1){

            console.log(node)
            console.log(relation)
            console.log(child)
            let childpoly = terraformerparser.parse(child.getValue());
            return (this.nodeprimitivepoly.contains(childpoly) || this.nodeprimitivepoly.intersects(childpoly))
        } 
        return false; 
    }
}