import { createClient } from "redis";
import { connect } from "mongoose";

class MongoClient {
  url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/mydb";
  async connect() {
    try {
      await connect(this.url, {
        serverSelectionTimeoutMS: 4000,
        heartbeatFrequencyMS: 2000,
      });
      console.log("Connected to MongoDB ✅");
    } catch (error: any) {
      console.error("Error connecting to MongoDB:", error?.message);
    }
  }
}

class RedisClient {
  url = process.env.REDIS_URL || "redis://127.0.0.1:6379";
  connected!: number;
  conn!: any;
  async connect() {
    try {
      const conn = await createClient({
        url: this.url,
        socket: {
          connectTimeout: 5000,
          reconnectStrategy: function (retries) {
            if (retries > 3) {
              console.log(
                "Too many attempts to reconnect. Redis connection was terminated"
              );
              return new Error("Too many retries.");
            } else {
              return retries * 10;
            }
          },
        },
      });
      conn.on("error", (err) => {
        this.connected = 0;
        throw err;
      });
      conn.connect();
      conn.on("connect", () => {
        console.log("Connected to Redis 👍 ");
      });
      conn.on("ready", () => {
        this.connected = 1;
        this.conn = conn;
        console.log("Redis is ready to execute commands 🐱‍👤");
      });
    } catch (error: any) {
      console.log("Error connecting to Redis -> ", error?.message);
    }
  }
  async set(key: string, value: string) {
    try {
      const temp = await this.conn.setEx(key, 120, value);
    } catch (error) {
      console.log("error during set command ", error);
    }
  }

  async get(key: string) {
    try {
      const temp = await this.conn.get(key);
      const result = JSON.parse(temp);
      return result;
    } catch (error) {
      console.log("error during get command ", error);
    }
  }
}

const mongoClient = new MongoClient();
const redisClient = new RedisClient();

export { mongoClient, redisClient };
