import { CheckService } from './check-service';
import { LogEntity } from '../../entities/log.entity';



describe('check-service.ts', () => {

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  };

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(
    mockRepository,
    successCallback,
    errorCallback
  );

  beforeEach(() =>{
    jest.clearAllMocks();
  });

  test('should call successCallback when service is available', async () => {

    const wasSuccessful = await checkService.execute('http://service.com');

    expect( wasSuccessful ).toBe( true );
    expect( successCallback ).toHaveBeenCalled();
    expect( errorCallback ).not.toHaveBeenCalled();
    expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );  

  });

  test( 'should call errorCallback when fetch returns false', async () => {

    const wasOk = await checkService.execute( 'https://goasdfasdfasdfasdogle.com' );
    
    expect( wasOk ).toBe( false );
    expect( successCallback ).not.toHaveBeenCalled()
    expect( errorCallback ).toHaveBeenCalled();

    expect( mockRepository.saveLog ).toBeCalledWith(
      expect.any( LogEntity )
    );

  } );

});