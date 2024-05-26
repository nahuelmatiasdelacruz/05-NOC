import { Server } from './presentation/server';
import 'dotenv/config';

(async ()=>{
  await main();
})();

async function main(){
  Server.start();
}