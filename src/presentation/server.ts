import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);

export class Server {
  
  public static start() {
    console.log('Server started');

    const emailService = new EmailService();

    emailService.sendEmail({
      to: "llobozamora@gmail.com",
      subject: "NOC System Logs by Gumalu Technologies",
      htmlBody: `
        <h3>System Logs - NOC</h3>
        <p>Logs are being stored in the file system</p>
        <p>Check the logs in the file system</p>
      `
    });


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