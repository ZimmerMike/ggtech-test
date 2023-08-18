import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import movieRoutes from './routes/movieRoutes';
import connectToDatabase from './db-connection';
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', movieRoutes);
app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});

connectToDatabase();
