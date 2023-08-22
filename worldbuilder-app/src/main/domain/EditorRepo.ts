import { Editor } from '@actuallyadequate/worldbuilder-api';
import { app } from 'electron';
import fs from 'fs';
import { join } from 'path';

export class EditorRepository {
    loadedPlugins: Editor[];
    onNewEditor: () => void;

    constructor(onNewEditor: ()=> void = ()=>{}) {
        this.loadedPlugins = [];
        this.onNewEditor = onNewEditor;
    }


    get pluginPaths() {
        const appPath = app.getAppPath();
        const userDataPath = app.getPath('userData');

        const paths = [
            //join(userDataPath, "./worldbuilder/plugins"),
        ];

        if (process.env.NODE_ENV === 'development') {
            paths.push(join(appPath, "./../worldbuilder-plugins"));
        }

        return paths;
    }

    loadPluginsInPaths() {
        this.pluginPaths.forEach(path => {
            const plugins = fs.readdirSync(path);
    
            plugins.forEach(plugin => {
                this.loadPlugin(plugin, path);
            })
        });
    }

    loadPlugin(plugin :string, path: string) {
        const pluginPath = join(path, plugin);
        const pluginPathPackageJson = join(pluginPath, 'package.json');
    
        if (!fs.existsSync(pluginPath)) {
            console.warn(`Plugin directory ${pluginPath} does not exist`);
            return;
        }
    
        if (!fs.existsSync(pluginPathPackageJson)) {
            console.warn(`Plugin package json ${pluginPathPackageJson} does not exist`);
            return;
        }
    
        let pluginInfo = JSON.parse(fs.readFileSync(pluginPathPackageJson).toString());
        
        pluginInfo = Object.assign(pluginInfo, {
            pluginPath,
            main: join(pluginPath, pluginInfo.main),
        })
        
        this.importPlugin(pluginInfo);
    }

    async importPlugin({main} :{main: string}) {
        try {
            let plugin = await import(main)
            if(plugin.default){
                this.addPlugin(plugin.default); //dangerously assuming it is a plugin
            } else console.warn(`Editor ${main} does not have default export`);

        } catch (err) {
            console.error("Error loading plugin " + main + " :: " + err);
        }
    }

    addPlugin(plugin: Editor) {
        this.loadedPlugins.push(plugin);
        this.onNewEditor();
    }
}