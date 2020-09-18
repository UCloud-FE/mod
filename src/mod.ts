import { getTimeout, moduleInfoResolver } from './config';
import { load as loadScript } from './loader/scriptLoaderPromise';
import { load as loadCSS } from './loader/cssLoader';
import promiseOnce from './util/promiseOnce';
import {
    getExports as getModuleExports,
    update as updateModule,
    register as registerModule,
    defined as moduleDefined,
    wait as waitModule
} from './module';
import { ModuleInfo } from './interface';

const moduleResolverMap = {};
export const registerModuleResolver = (type, resolver) => {
    moduleResolverMap[type] = resolver;
};

const loadModule = promiseOnce(async (moduleKey, moduleInfo) => {
    if (!moduleInfo) return;

    const isModule = moduleInfo.type !== 'immediate';
    if (moduleInfo.type && isModule) {
        let type = moduleInfo.type,
            options;
        if (typeof type !== 'string') {
            [type, options] = type;
        }
        if (moduleResolverMap[type]) {
            return await moduleResolverMap[type](moduleKey, options);
        }
    }

    try {
        if (isModule) registerModule(moduleKey);
    } catch (error) {
        return;
    }
    const { js = [], css = [], dep = [] } = moduleInfo;
    const moduleLoad = async () => {
        const jsLoad = js.map(f => loadScript(f));
        const cssLoad = css.map(f => loadCSS(f));
        await Promise.all([...jsLoad, ...cssLoad]);
        if (isModule) updateModule(moduleKey, 2);
    };
    const depLoad = async () => {
        const depLoad = dep.map(_import);
        await Promise.all(depLoad);
    };
    await Promise.all([moduleLoad(), depLoad()]);
    if (isModule) updateModule(moduleKey, 5);
    return moduleInfo;
});

type module = string | ModuleInfo;

const isArrayModules = (modules: module | module[]): modules is module[] =>
    Object.prototype.toString.call(modules) === '[object Array]';

const _import = async (modules: module | module[] = []): Promise<unknown | unknown[]> => {
    let isSingle = false;
    const timeout = getTimeout();
    if (!isArrayModules(modules)) {
        modules = [modules];
        isSingle = true;
    }
    const moduleInfos = modules.map(moduleInfoResolver);
    await Promise.all(moduleInfos.map(moduleInfo => loadModule(moduleInfo.key, moduleInfo)));
    await Promise.all(
        moduleInfos.map((moduleInfo, i) => moduleInfo.type !== 'immediate' && waitModule(moduleInfo.key, 6, timeout))
    );
    return isSingle ? getModuleExports(modules[0]) : modules.map(getModuleExports);
};

const _export = (moduleName: string, module: any) => {
    if (moduleDefined(moduleName)) {
        console.error(`Warning: Module ${moduleName} already existed, you can't export duplicated`);
    } else {
        updateModule(moduleName, 6, { exports: module });
    }
};

export { _import as import, _export as export };