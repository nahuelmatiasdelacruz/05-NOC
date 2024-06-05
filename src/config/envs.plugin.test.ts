import { envs } from "./plugins";
describe('Pruebas en envs.plugin.ts',()=>{
  test('should return env options',()=>{
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_EMAIL:'nahueldelacruz9@gmail.com',
      MAILER_SECRET_KEY: 'istdikqledulmxyf',
      MAILER_SERVICE: 'gmail',
      PROD: false,
      MONGO_URL: 'mongodb://nahuel:123456@localhost:27017',
      MONGO_DB_NAME: 'NOC',
      MONGO_USER: 'nahuel',
      MONGO_PASS: '123456',
      POSTGRES_URL: 'postgresql://postgres:n4014319970219@127.0.0.1:5432/noc',
      POSTGRES_USER: 'postgres',
      POSTGRES_DB: 'noc',
      POSTGRES_PASSWORD: 'n4014319970219'
    })
  });

  test('should return error if not found env',async ()=>{
    jest.resetModules();
    process.env.PORT = 'ABC';
    try{
      await import('./plugins/envs.plugin');
      expect(true).toBe(false);
    }catch(e){
      expect(`${e}`).toContain('EnvVarError: env-var: "PORT" should be a valid integer');
    }
  })
});