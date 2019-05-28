import FollowCondition from './FollowCondition';
import Node from '../tree/Node';
import EmitCondition from './EmitCondition';

export default class GreaterThanCondition implements FollowCondition, EmitCondition{

    object: any;
    locale: string;
    constructor(searchObject: any, locale: string="be"){
        this.object = searchObject;
        this.locale = locale;
    }

    check_condition(node:Node, nodeContext) {
        let value = node.getValue()
        if (typeof this.object === 'string' || this.object instanceof String){
            if (!(typeof value === 'string' || value instanceof String)){
                throw new Error("Searching for a " + typeof this.object + " in a tree with " + typeof value + " value types.")
            }
            return (this.object.localeCompare(value.valueOf()) === 1) // Localecompare returns 1 value if the object (search string) is larger than the value (node value)
        } else if(typeof this.object === 'number' || this.object instanceof Number){
            if (!(typeof value === 'number' || value instanceof Number)){
                throw new Error("Searching for a " + typeof this.object + " in a tree with " + typeof value + " value types.")
            }
            return this.object > value;
        }
    }
}