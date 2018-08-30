import SingleQuery from './SingleQuery';
import Condition from '../condition/Condition';
import Session from '../Session';

class SearchStringQuery extends SingleQuery{
    savecondition: Condition;
    followcondition: Condition;
    removecondition: Condition;

    constructor(session:Session,
         savecondition: Condition,
         followcondition: Condition,
         removecondition: Condition,
         searchstring: string){
        super(session, savecondition, followcondition, removecondition);
        super.set_iteration_value(searchstring);
    }
}

