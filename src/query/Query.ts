import EventEmitter = require('events');
import Session from '../Session';

// This is the query abstract class template
// A query consists of a session on which it is executed,
export default abstract class Query extends EventEmitter{

    session: Session;

    set_session(session: Session){
        this.session = session;
    }

    abstract async query(): Promise<Session>;

}