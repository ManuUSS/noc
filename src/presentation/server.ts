import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infraestructure/datasources/mongo-log.datasource';
import { LogRepositoryImplementation } from '../infraestructure/repositories/log.repository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const logRepository = new LogRepositoryImplementation(
  // new FileSystemDataSource()
  new MongoLogDataSource()
);
const emailService = new EmailService();

export class Server {
  
  public static async start() {
    console.log('Server started');

    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute(['llobozamora@gmail.com', 'imanuel.ulate@gmail.com'])


    CronService.createJob(
      '*/3 * * * * *', 
      () => {
        const url = 'https://google.com';
        new CheckService(
          logRepository,
          () => console.log(`${url} is available`), 
          (error) => console.log(`Error: ${error}`)
        ).execute( url );
      }
    ).start();

    const logs = await logRepository.getLogs( LogSeverityLevel.high );
    console.log( logs );
  }

}