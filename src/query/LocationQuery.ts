import SingleQuery from './SingleQuery';
import Condition from '../condition/Condition';
import Session from '../Session';
import Node from '../tree/Node';
import ChildRelation from '../tree/ChildRelation';
import OrCondition from '../condition/OrCondition';
import StringContainedCondition from '../condition/StringContainedCondition';
import StringContainsCondition from '../condition/StringContainsCondition';
import LocationContainedCondition from "../condition/LocationContainedCondition";
import LocationContainedSaveCondition from '../condition/LocationContainedCondition.1';

export default class LocationQuery extends SingleQuery{
    followcondition: Condition;

    constructor(locationString: string)
        {
            super(new LocationContainedSaveCondition(locationString), new LocationContainedCondition(locationString));
        }
}

