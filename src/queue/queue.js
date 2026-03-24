import { Queue } from "bullmq";

export const downloadQueue = new Queue("downloads", {
  connection: {
    host: "127.0.0.1",
    port: 6379
  }
});

console.log("✅ Queue initialized");