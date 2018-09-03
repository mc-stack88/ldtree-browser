import Condition from './Condition';
import ChildRelation from '../tree/ChildRelation';
import Node from '../tree/Node';
import RelationType from '../tree/RelationType';
import * as terraformer from 'terraformer'
import * as terraformerparser from 'terraformer-wkt-parser'
import {Primitive} from "terraformer";
import {GeoJsonObject} from "geojson";
import FollowCondition from './FollowCondition';
import SaveCondition from './SaveCondition';

export default class LocationContainedSaveCondition implements SaveCondition {

    nodeprimitivepoly: Primitive<GeoJsonObject>;

    constructor(polygonwktstring: string){
        let nodepoly = terraformerparser.parse(polygonwktstring);
        this.nodeprimitivepoly = new terraformer.Primitive(nodepoly)
    }

    check_condition(node:Node, iterationValue) {
        let nodePoly = terraformerparser.parse(node.getValue());
        return (this.nodeprimitivepoly.contains(nodePoly) || this.nodeprimitivepoly.intersects(nodePoly))
    }
}