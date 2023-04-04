import express from 'express';
import { fnAsync, fnSync } from './utils.js';
import { createRequestContext, getRequestContext } from './hooks.js';
const app = express();
const port = 3000;

app.use((req, res, next) => {
    const data = { reqPath: req.path, reqMethod: req.method };
    createRequestContext(data);
    next();
});

app.get('/', (req, res, next) => {
    const { message } = req.query;
    fnSync(message);
    fnAsync(message);
    res.send('done');
});

app.get('/test', (req, res, next) => {
    fnSync('TEST HERE');
    res.send('done');
});

app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.log(`Server is listening on ${port}`);
});
