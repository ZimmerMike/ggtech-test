import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import movieRoutes from './routes/movieRoutes';
import connectToDatabase from './db-connection';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

connectToDatabase();

app.use('/api', movieRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});