import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { SendEmailLogs } from './send-email-logs';



describe('send-email-logs.ts', () => {

  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
  }

  const mockLogRepository:LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call send email and save log', async () => {


    const resolve = await sendEmailLogs.execute('correo@gmail.com');

    expect( resolve ).toBe( true );
    expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalled();
    expect( mockLogRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );

  });

  test('should log in case of error', async () => {

    mockEmailService.sendEmailWithFileSystemLogs = jest.fn().mockReturnValue( false );

    const resolve = await sendEmailLogs.execute('correo@gmail.com');

    expect( resolve ).toBe( true );
    expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalled();
    expect( mockLogRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );

  });

})