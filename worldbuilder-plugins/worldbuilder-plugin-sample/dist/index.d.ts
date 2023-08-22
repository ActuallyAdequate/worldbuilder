import { Editor } from "../node_modules/@actuallyadequate/worldbuilder-api/lib/index";
export default class HelloWorldEditor extends Editor {
    constructor();
    OnOpen(): void;
    OnClose(): void;
    OnRender(): HTMLElement;
}
