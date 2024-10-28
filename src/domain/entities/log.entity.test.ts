import { LogEntity, LogSeverityLevel } from "./log.entity";


describe('log.entity.ts', () => {
  
  const data = {
    message: 'test message',
    origin: 'log.entity.test.ts',
    level: LogSeverityLevel.low,
  };

  test('should create a LogEntity instance', async() => {


    const log = new LogEntity( data );

    expect( log ).toBeInstanceOf( LogEntity );
    expect( log.message ).toBe( data.message );
    expect( log.level ).toBe( data.level );
    expect( log.createdAt ).toBeInstanceOf( Date );

  });

  test('should create a log entity from json object', async() => {

    const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2023-08-31T16:39:15.618Z","origin":"check-service.ts"}`;
    
    const log = LogEntity.fromJson( json );

    expect( log ).toBeInstanceOf( LogEntity );
    expect( log.message ).toBe( "Service https://google.com working" );
    expect( log.level ).toBe( LogSeverityLevel.low );
    expect( log.origin ).toBe( "check-service.ts" );
    expect( log.createdAt ).toBeInstanceOf( Date );

  });

  test('should create a LogEntity instance from object', () => {

    const log = LogEntity.fromObject( data );

    expect( log ).toBeInstanceOf( LogEntity );
    expect( log.message ).toBe(  data.message );
    expect( log.level ).toBe(  data.level );
    expect( log.origin ).toBe(  data.origin );
    expect( log.createdAt ).toBeInstanceOf( Date );

  });

});