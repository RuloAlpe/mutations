import dotenv from 'dotenv';

dotenv.config();

const config = {};

config.mongodbURI = process.env.MONGODB_URI;
config.serverPort = process.env.SERVER_PORT;

export default config;