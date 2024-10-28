import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceMultipleUseCase {
  execute( url: string ): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error:string ) => void) | undefined;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogsRepository( log: LogEntity ) {
    this.logRepository.forEach( repository => {
      repository.saveLog( log )
    });
  };

  public async execute( url:string ):Promise<boolean> {

    try {

      const req = await fetch( url );

      if( !req.ok ) {
        throw new Error( 'Service is not available' );
      }

      const log = new LogEntity({
        message: `Service ${ url } is working`,
        level: LogSeverityLevel.low,
        origin: 'check-service.ts'
      });

      this.callLogsRepository( log );
      this.successCallback?.();

      return true;
    } catch ( error ) {
      const errorMessage = `${ url } is not ok - ${ error }`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts'
      });
      
      this.callLogsRepository( log );
      this.errorCallback?.( errorMessage );
      return false;
    } 

  }

}