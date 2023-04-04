import { getRequestContext, track } from './hooks.js';

export const fnSync = message => {
    console.log(
        `${getRequestContext().requestId}: Message from fnSync: ${message}`
    );
    fnAsync(message);
    track('fnSync');
};

export const fnAsync = async message => {
    setTimeout(() => {
        track('fnAsync');
    }, 300);
};
