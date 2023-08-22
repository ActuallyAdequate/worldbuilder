export abstract class Editor {

    name: string;

    constructor(name : string){
        this.name = name;
    }

    abstract OnOpen():void;
    abstract OnClose():void;
    abstract OnRender(): HTMLElement;
}