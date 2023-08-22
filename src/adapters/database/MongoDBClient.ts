import mongoose from "mongoose";
import { mongoConfig } from "../../config/mongoConfig";
import { Exception } from "../../domain/exception";

export class MongoDBClient {

  /**
   * @description Creates connection to MongoDB database
   */
  public connect(): void {
    try {
      mongoose.connect(mongoConfig.uri);

      console.log('Connected to database!');
    } catch (error) {
      throw new Exception('An error ocurred connecting to database.');
    }
  }

  /**
   * @description Closes connection to MongoDB database.
   */
  public async disconnect(): Promise<void> {
    mongoose.connection.close();
    console.log('Disconnected from database');
  }
}