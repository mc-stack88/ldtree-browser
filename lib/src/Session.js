"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Session {
    constructor(nodes) {
        this.nodes = nodes;
    }
    is_empty() {
        return this.nodes.length == 0;
    }
}
exports.default = Session;
//# sourceMappingURL=Session.js.map