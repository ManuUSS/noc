import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase {
  execute: ( to:string | string[] ) => Promise<boolean>; 
}

export class SendEmailLogs implements SendLogEmailUseCase {

  constructor (
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute( to:string | string[] ):Promise<boolean> {

    try {
      const wasEmailSent = await this.emailService.sendEmailWithFileSystemLogs( to );

      if( !wasEmailSent ) {
        throw new Error('Email was not sent');
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Log email sent',
        origin: 'send-email-logs.ts'
      });

      this.logRepository.saveLog( log );

      return true;
    } catch ( error ) {
      
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `Error sending email: ${error}`,
        origin: 'send-email-logs.ts'
      });

      this.logRepository.saveLog( log );
      return false;
    }


  }


}