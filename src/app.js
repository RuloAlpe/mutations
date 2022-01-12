import express from 'express';
import routes from './routes/index.routes';

import config from './config/config.dev';

const {
  serverPort,
} = config;

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api', routes);

// json format and upload filesize limit
app.use(express.json({ limit: '10 mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

export default app;

// app.listen(serverPort, () => console.log(`Server listo! √ en puerto: ${serverPort}`));
