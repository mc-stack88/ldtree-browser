import Node from "./tree/Node";
import ContextUpdater from './contextUpdater/contextUpdater';

export default class Session {

    nodes: Array<Node>;
    context: Array<Object>;

    public constructor(nodes: Array<Node>) {
        this.nodes = nodes;
        if (this.context === undefined || this.context === null){this.context = []}
        for (var i = 0; i < nodes.length; i++){
            this.context.push({})
        }
    }

    updateNodeContext(updater: ContextUpdater){
        for (var i = 0; i < this.nodes.length; i++){
            updater.updateContext(this.nodes[i], this.context[i])
        }
    }

    isEmpty(): boolean {
        return this.nodes.length == 0;
    }

    getLength() {
        return this.nodes.length;
    }

    getNodes(): Array<Node>{
        return this.nodes;
    }

}