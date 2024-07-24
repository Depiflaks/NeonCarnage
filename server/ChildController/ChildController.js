import { fork } from 'child_process';

export class ChildController {
    constructor(port) {
        this.childs = {};
        this.port = port;
    }

    getNewPort() {
        this.port += 1;
        return this.port;
    }

    sendStart(id, data) {
        this.childs[id].send({
            type: "start",
            body: data,
        });
    }

    create(id, port) {
        this.childs[id] = fork('./server/child.js', [id, port]);
        this.childs[id].port = port;
        this.childs[id].on('message', (message) => {
            this.onMessage(message, id)
        });
    }

    onMessage(message, id) {
        switch (message.type) {
            case "init":
                console.log(`Child ${id} is working`);
                break;
            default:
                break;
        }
        
    }

    kill(id) {
        console.log("kill child: ", id);
        if (this.childs[id]) this.childs[id].kill()
    }
}