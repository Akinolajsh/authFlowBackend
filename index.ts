import express, { Application } from "express";
import { mainApp } from "./mainApp";
import { authBase } from "./config/Database";
import dotenv from "dotenv";
dotenv.config()

const port: number = parseInt(process.env.PORT!);

const app: Application = express();

mainApp(app);
const server = app.listen(process.env.PORT || port, () => {
  authBase();
  console.log("server listening on port", port);
});

process.on("uncaughtException", (err: any) => {
  console.log("");
  console.log("Unable to connect due to uncaughtException", err.message);

  process.exit(1);
});

process.on("uncaughtException", (reason: any) => {
  console.log("");
  console.log("Unable to connect due to uncaughtException", reason.message);

  server.close(() => {
    process.exit(1);
  });
});
