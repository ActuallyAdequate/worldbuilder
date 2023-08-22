import { Editor } from "../node_modules/@actuallyadequate/worldbuilder-api/lib/index";


export default class HelloWorldEditor extends Editor {
    constructor() {
        super("Hello World")
    }
    OnOpen(): void {
        throw new Error("Method not implemented.")
    }
    OnClose(): void {
        throw new Error("Method not implemented.")
    }

    OnRender(): HTMLElement {
        let div = document.createElement("div");
        div.textContent = this.name;
        return div;
    }

}