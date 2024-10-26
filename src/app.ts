import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo';
import { LogModel } from './data/mongo/models/log.model';
import { Server } from './presentation/server';


(async() => {
  main();
})();

async function main() {
  
  // await MongoDatabase.connect({
  //   mongoUrl: envs.MONGO_URL,
  //   dbName: envs.MONGO_DB_NAME
  // });


  // const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     message: 'Hello World',
  //     origin: 'app.ts',
  //     level: 'LOW'
  //   }
  // });
  // console.log( newLog );
  
  // const logs = await prisma.logModel.findMany(
  //   {
  //     where: {
  //       level: 'LOW'
  //     }
  //   }
  // );

  // const newLog = await LogModel.create({
  //   message: 'Hello World',
  //   origin: 'app.ts',
  //   level: 'low'
  // });

  // await newLog.save();

  // const logs = await LogModel.find();

  

  Server.start();
}