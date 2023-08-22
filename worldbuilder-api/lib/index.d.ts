export declare abstract class Editor {
    name: string;
    constructor(name: string);
    abstract OnOpen(): void;
    abstract OnClose(): void;
    abstract OnRender(): HTMLElement;
}
