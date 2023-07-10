import cors from 'cors';
import express, { Express } from 'express';
import { version } from './package.json';
import environment from './src/environment';

const app: Express = express();
const port = environment.port;

app.use(cors())
app.get('/', (_, res) => res.send(`Version ${version}`))

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});