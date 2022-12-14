import { AnyFunction } from '../interface';
import get from '../util/get';
import pendingFactory from '../util/pendingFactory';

const fileCacheMap: {
    [src: string]: {
        state: 0 | 1 | 2;
        data?: Error | string;
    };
} = {};

const fileQueueMap: {
    [src: string]: { ready: AnyFunction; error: AnyFunction }[];
} = {};

async function load(filePath) {
    if (filePath in fileCacheMap) {
        const fileState = fileCacheMap[filePath];
        const { state, data } = fileState;
        switch (state) {
            case 0: {
                const [pending, ready, error] = pendingFactory();
                if (!fileQueueMap[filePath]) {
                    fileQueueMap[filePath] = [];
                }
                fileQueueMap[filePath].push({ ready, error });
                return await pending;
            }
            case 1: {
                return data;
            }
            case 2: {
                throw data;
            }
        }
    }
    fileCacheMap[filePath] = {
        state: 0
    };
    try {
        const req = await get(filePath);
        const data = req?.responseText;
        fileCacheMap[filePath] = {
            state: 1,
            data
        };
        setTimeout(() => {
            const queue = fileQueueMap[filePath];
            if (queue) {
                queue.forEach(({ ready }) => {
                    ready(data);
                });
                delete fileQueueMap[filePath];
            }
        });
        return req.responseText;
    } catch (e) {
        fileCacheMap[filePath] = {
            state: 2,
            data: e
        };
        setTimeout(() => {
            const queue = fileQueueMap[filePath];
            if (queue) {
                queue.forEach(({ error }) => {
                    error(e);
                });
                delete fileQueueMap[filePath];
            }
        });
        throw e;
    }
}

export { load };
