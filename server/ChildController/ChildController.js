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

    create(id, port) {
        this.childs[id] = fork('./server/child.js', [id, port]);
        this.childs[id].port = port;
        this.childs[id].on('message', (message) => {
          console.log(`Child ${id} is working`);
        });
    }

    kill(id) {
        this.childs[id].kill()
    }
}