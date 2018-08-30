import EventEmitter = require('events');
import Session from '../Session';

// This is the query abstract class template
// A query consists of a session on which it is executed,
export default abstract class Query extends EventEmitter{

    session: Session;

    public constructor(session:Session){
        super();
        this.session = session;
    }

    abstract query(): Session;

}