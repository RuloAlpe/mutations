import config from '../config/config.dev';
import mongoose from 'mongoose';

const {
  mongodbURI,
} = config;

// Conectar a la BD
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // poolSize: 10, // Maintain up to 10 socket connections
});

// Verificar si conecta o no a la BD
mongoose.connection.on('connected', () => {
  console.log(`Conectado a la BD ${mongodbURI}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Error al conectar a la BD ${err}`);
});


// import Mongoose from 'mongoose';

// Mongoose.Promise = global.Promise;

// const connectToDb = (dbUser, dbPass, dbHost, dbName) => {
//   return new Promise((resolve, reject) => {
//     Mongoose.connect(
//       `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}`,
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         poolSize: 10, // Maintain up to 10 socket connections
//       },
//     )
//       .then(() => resolve(dbName))
//       .catch(err => reject(err));
//   });
// };

// export default connectToDb;
