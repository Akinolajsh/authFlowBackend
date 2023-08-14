import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { HTTP, mainError } from "./Error/mainError";
import { errorHandler } from "./Error/errorHandler";
import auth from "./router/authFlowRoute"

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );

app.use("/api/v1/auth",auth)

  app.get("/api/v1/auth", (req: Request, res: Response) => {
    try {
      res.status(HTTP.OK).json({
        message: "Good to go!!",
      });
    } catch (error) {
      res.status(HTTP.BAD_REQUEST).json({
        message: error.message,
      });
    }
  });

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new mainError({
        name: " Route Erorr",
        message: "this error is coming from route",
        status: HTTP.BAD_REQUEST,
        success: false,
      })
    );
  });
  app.use(errorHandler);
};
