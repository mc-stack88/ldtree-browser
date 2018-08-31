"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
// This is the query abstract class template
// A query consists of a session on which it is executed,
class Query extends EventEmitter {
    constructor(session) {
        super();
        this.session = session;
    }
}
exports.default = Query;
//# sourceMappingURL=Query.js.map