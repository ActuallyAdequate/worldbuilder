import { Editor } from "@actuallyadequate/worldbuilder-api";
import { EditorRepository } from "./EditorRepo";

export class World {
    editorRepo : EditorRepository;

    constructor() {
        this.editorRepo = new EditorRepository(()=>{
            console.log(this.editorRepo.loadedPlugins);
        });
        this.editorRepo.loadPluginsInPaths();
    }
}