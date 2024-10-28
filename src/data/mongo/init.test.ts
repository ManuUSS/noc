import mongoose from "mongoose";
import { MongoDatabase } from "./init";


describe('init.ts', () => {

  afterAll( async () => {
    mongoose.connection.close();
  });

  test('should connect to mongodb', async () => {

    const connected = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName:   process.env.MONGO_DB_NAME!,
    });

    expect( connected ).toBeTruthy();

  });

  test('should throw an error', async () => {

    try {
      await MongoDatabase.connect({
        mongoUrl: 'mongodb://localhost:27017',
        dbName:   'test',
      });
      expect( true ).toBeFalsy();
    } catch (error) {
      expect( error ).toBeDefined();
    }

  });

});