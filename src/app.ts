import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import movieRoutes from './routes/movieRoutes';
import connectToDatabase from './db-connection';
const app = express();
const PORT = process.env.PORT || 3000;

export class App {
  private express: Application;
  
  constructor() {
    this.express = express(); 
    this.bootstrap();
  }

  public getExpress(): Application {
    return this.express;
  }

  private bootstrap(): void {
    this.middleware();
  }

  private middleware(): void {
    app.use(cors());
    app.use(bodyParser.json());
    
    connectToDatabase();
    
    app.use('/api', movieRoutes);
  }
}
