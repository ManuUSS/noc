import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { LogRepositoryImplementation } from '../infraestructure/repositories/log.repository';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);
const emailService = new EmailService();

export class Server {
  
  public static start() {
    console.log('Server started');

    new SendEmailLogs(
      emailService,
      fileSystemLogRepository
    ).execute(['llobozamora@gmail.com', 'imanuel.ulate@gmail.com'])


    // CronService.createJob(
    //   '*/3 * * * * *', 
    //   () => {
    //     const url = 'https://google.com';
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log(`${url} is available`), 
    //       (error) => console.log(`Error: ${error}`)
    //     ).execute( url );
    //   }
    // ).start();

  }

}