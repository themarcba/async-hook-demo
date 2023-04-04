import asyncHooks from 'async_hooks';
import { v4 } from 'uuid';
const store = new Map();

const asyncHook = asyncHooks.createHook({
    init: (asyncId, _, triggerAsyncId) => {
        if (store.has(triggerAsyncId)) {
            store.set(asyncId, store.get(triggerAsyncId));
        }
    },
    destroy: asyncId => {
        if (store.has(asyncId)) {
            store.delete(asyncId);
        }
    },
});

asyncHook.enable();

export const createRequestContext = (data, requestId = v4()) => {
    const requestInfo = { data, requestId };
    console.log(`${requestId}: API CALL: ${data.reqMethod} ${data.reqPath}`);

    store.set(asyncHooks.executionAsyncId(), requestInfo);
    return requestInfo;
};

export const getRequestContext = () => {
    return store.get(asyncHooks.executionAsyncId());
};

export const track = fnName => {
    const context = getRequestContext();
    if (context) {
        console.log(`${context.requestId} from ${fnName}`);
    }
};
