import app from './app';
import './database/connect';
import config from './config/config.dev';

const {
  serverPort,
} = config;

app.listen(serverPort);
console.log(`Server listo! √ en puerto: ${serverPort}`);

// connectToDb(dbUser, dbPass, dbHost, dbName)
//   .then((dbCollection) => {

//   })
//   .catch(error => console.error(`Error al conectar a la DB -> ${error}`));
