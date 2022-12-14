import { load as _load } from './scriptLoader';
import promiseOnce from '../util/promiseOnce';

export const load = promiseOnce((path: Parameters<typeof _load>[0], options?: Parameters<typeof _load>[2]) => {
    return new Promise((resolve, reject) => {
        _load(
            path,
            event => {
                if (event.type === 'error') {
                    const error = new Error(`Load ${path} fail`);
                    (error as any).originEvent = event;
                    reject(error);
                } else {
                    resolve(event);
                }
            },
            options
        );
    });
});
