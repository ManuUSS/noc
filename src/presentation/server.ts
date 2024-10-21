import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {
  
  public static start() {
    console.log('Server started');

    CronService.createJob(
      '*/3 * * * * *', 
      () => {
        new CheckService().execute('https://google.com');
      }
    );

  }

}