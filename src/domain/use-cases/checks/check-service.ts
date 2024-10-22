import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute( url: string ): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = ( error:string ) => void;


export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}


  public async execute( url:string ):Promise<boolean> {

    try {

      const req = await fetch( url );

      if( !req.ok ) {
        throw new Error( 'Service is not available' );
      }

      const log = new LogEntity(`Service ${ url } is working`, LogSeverityLevel.low );

      this.logRepository.saveLog( log );
      this.successCallback();

      return true;
    } catch ( error ) {
      const errorMessage = `${ error }`;
      const log = new LogEntity( errorMessage, LogSeverityLevel.low );
      this.logRepository.saveLog( log );
      this.errorCallback( errorMessage );
      return false;
    } 

  }

}