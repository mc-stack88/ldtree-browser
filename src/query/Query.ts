import EventEmitter = require('events');
import Session from '../Session';
import Node from '../tree/Node';

// This is the query abstract class template
// A query consists of a session on which it is executed,
export default abstract class Query extends EventEmitter{

    session: Session;

    set_session(session: Session){
        this.session = session;
    }

    abstract async query(): Promise<Session>;

    async emitMember(node: Node){
        let members = await node.getMembers();
        for (var member of members){
            if (Object.keys(member).length !== 0){
                this.emit("member", member)
            }
        }
    }  
    async emitNode(node){
        this.emit("node", node)
    }
}