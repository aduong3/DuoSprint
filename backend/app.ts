import cors from "cors";
import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.all(/.*/, (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: "URL not found!",
  });
});

export default app;
