import SearchTreeQuery from "./SearchTreeQuery";
import Condition from '../condition/Condition';
import EqualsCondition from '../condition/EqualsCondition';
import { OrCondition } from "..";
import LesserThanCondition from '../condition/LesserThanCondition';
import GreaterThanCondition from '../condition/GreaterThanCondition';


export default class LocationQuery extends SearchTreeQuery{
    followcondition: Condition;

    constructor(searchString: string, locale: string = "be")
        {
            super(new EqualsCondition(searchString, locale), new OrCondition(new LesserThanCondition(searchString, locale), new GreaterThanCondition(searchString, locale)));
        }
}

