import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';



describe('file-system.datasource.ts', () => {

  const logPath = path.join(__dirname, '../../../logs');

  beforeEach(() => {
    fs.rmSync( logPath, { recursive:true, force:true } );
  });


  test('should create a log files if they do not exists', () => {

    new FileSystemDataSource();

    const files = fs.readdirSync( logPath );

    expect( files.length ).toBe( 3 );
    expect( files ).toEqual(['logs-all.log', 'logs-medium.log', 'logs-high.log']);

  });


});