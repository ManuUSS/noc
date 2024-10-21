
interface CheckServiceUseCase {
  execute( url: string ): Promise<boolean>;
}



export class CheckService implements CheckServiceUseCase {



  public async execute( url:string ):Promise<boolean> {

    try {

      const req = await fetch( url );

      if( !req.ok ) {
        throw new Error( 'Service is not available' );
      }

      console.log(`${url} is available`);
      return true;
    } catch (error) {
      return false;
    } 

  }

}