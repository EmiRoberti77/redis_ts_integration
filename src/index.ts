import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const timeStamp = () => new Date().toISOString();

const redisClient = createClient({
  username: process.env.REDIS_USER!,
  password: process.env.REDIS_PASSWORD!,
  socket: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!),
  },
});
redisClient.on('error', (err) => console.log(err));

async function connect() {
  const connected = await redisClient.connect();
  console.log(connected);
}

async function setValue(key: string, value: string) {
  const response = await redisClient.set(key, value);
  console.log(response);
}

async function getValue(key: string): Promise<string | null> {
  const response = await redisClient.get(key);
  console.log(response);
  return response;
}

async function main() {
  await connect();
  const obj = {
    key: '54C1B68A-C723-4356-BECF-1859FE4368A5',
    value: '54C1B68A-C723-4356-BECF-1859FE4368A5',
  };
  await setValue(obj.key, obj.value);
  await getValue(obj.key);
}

main();
