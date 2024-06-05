import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe('init MongoDB',()=>{
  afterAll(()=>{
    mongoose.connection.close();
  })
  test('should connnect to mongodb', async () => {
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!
    });
    expect(connected).toBe(true);
  });
  test('should throw an error',async ()=>{
    try {
      const connected = await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: 'mongodb://nahuel:123456@localhost:2701723'
      });
      expect(true).toBe(false);
    } catch (e) {
      
    }
  })
});