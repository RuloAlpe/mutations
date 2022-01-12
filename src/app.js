import express from 'express';
import mongoose from 'mongoose';
import database from './database/con';
import routes from './routes/index.routes';

const app = express();
const port = 3050;

// Conectar a la BD
mongoose.connect(database.database);

// Verificar si conecta o no a la BD
mongoose.connection.on('connected', () => {
  console.log(`Conectado a la BD ${database.database}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Error al conectar a la BD ${err}`);
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api', routes);

// json format and upload filesize limit
app.use(express.json({ limit: '10 mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.listen(port, () => console.log(`Server listo! √ en puerto: ${port}`));
