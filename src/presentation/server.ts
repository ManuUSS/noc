import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);

export class Server {
  
  public static start() {
    console.log('Server started');

    CronService.createJob(
      '*/3 * * * * *', 
      () => {
        const url = 'https://google.com';
        new CheckService(
          fileSystemLogRepository,
          () => console.log(`${url} is available`), 
          (error) => console.log(`Error: ${error}`)
        ).execute( url );
      }
    ).start();

  }

}