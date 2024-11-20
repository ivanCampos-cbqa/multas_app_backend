import express from 'express'
import 'dotenv/config';
import { envs } from './config/envs.plugin';
import { MongoDatabase } from './data/init';


const app = express();
app.use(express.json());


(async () => {
  await MongoDatabase.connect({ mongoUrl: envs.MONGO_URL ?? "", dbName: "FineDB" });
})();

app.listen(envs.PORT, () => {
  console.log("Server started")
  
})