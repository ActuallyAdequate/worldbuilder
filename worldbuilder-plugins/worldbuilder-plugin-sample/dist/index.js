"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../node_modules/@actuallyadequate/worldbuilder-api/lib/index");
class HelloWorldEditor extends index_1.Editor {
    constructor() {
        super("Hello World");
    }
    OnOpen() {
        throw new Error("Method not implemented.");
    }
    OnClose() {
        throw new Error("Method not implemented.");
    }
    OnRender() {
        let div = document.createElement("div");
        div.textContent = this.name;
        return div;
    }
}
exports.default = HelloWorldEditor;
