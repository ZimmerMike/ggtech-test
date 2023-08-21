import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import { Routes } from './adapters/routes/movieRoutes';
import { MongoDBClient } from './adapters/database/MongoDBClient';

const app = express();
const mongoDBClient = new MongoDBClient();
const PORT = process.env.PORT || 3000;
const routes = new Routes();

app.use(cors());
app.use(bodyParser.json());
routes.routes(app);

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
  mongoDBClient.connect();
});

process.on('SIGINT', () => {
  mongoDBClient.disconnect();
  process.exit(0);
});
