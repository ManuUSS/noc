describe('envs.plugin.ts', () => {

  test('should return error if env var is not found', async () => {

    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugin');
      expect( true ).toBe( false );
    } catch ( error ) {
      expect( `${error}` ).toContain('"PORT" should be a valid integer');
    }

  });

});
