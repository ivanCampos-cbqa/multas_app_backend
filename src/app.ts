import express from 'express'
import 'dotenv/config';
import { envs } from './config/envs.plugin';
import { MongoDatabase } from './data/init';
import { AppRoutes } from './presentation/routes';


const app = express();
app.use(express.json());
app.use(AppRoutes.routes);



(async () => {
  await MongoDatabase.connect({ mongoUrl: envs.MONGO_URL ?? "", dbName: "FineDB" });
})();

app.listen(envs.PORT, () => {
  console.log(`Server listening on port ${envs.PORT}`);
  
})