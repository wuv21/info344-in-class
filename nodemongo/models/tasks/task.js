"use strict";

//TODO: implement a Task class
//for the task model, and export
//it from this module

class Task {
    constructor(props) {
        Object.assign(this, props);
    }

    validate() {
        if (!this.title) {
            return new Error("you must supply a title");
        }
    }
}

module.exports = Task;