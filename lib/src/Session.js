"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Session {
    constructor(nodes) {
        this.nodes = nodes;
        if (this.context === undefined || this.context === null) {
            this.context = [];
        }
        for (var i = 0; i < nodes.length; i++) {
            this.context.push({});
        }
    }
    isEmpty() {
        return this.nodes.length == 0;
    }
    getLength() {
        return this.nodes.length;
    }
    getNodes() {
        return this.nodes;
    }
}
exports.default = Session;
//# sourceMappingURL=Session.js.map