"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
// This is the query abstract class template
// A query consists of a session on which it is executed,
class Query extends EventEmitter {
    /**
     * Sets the session object that is used throughout the query.
     * @param session -
     */
    set_session(session) {
        this.session = session;
    }
    /**
     * All members of the passed node are emitted.
     * @param node
     */
    emitMember(node) {
        return __awaiter(this, void 0, void 0, function* () {
            let members = yield node.getMembers();
            for (var member of members) {
                if (member === null || member === undefined) {
                    console.log(node);
                    console.log("THIS", member);
                }
                if (Object.keys(member).length !== 0) {
                    this.emit("member", member);
                }
            }
        });
    }
    /**
     * The node itself is emitted.
     * @param node
     */
    emitNode(node) {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit("node", node);
        });
    }
}
exports.default = Query;
//# sourceMappingURL=Query.js.map