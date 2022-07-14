import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;
import helmet from "helmet";
import cors from "cors";
import path from "path";

app.use(express.json());
app.use(helmet());
app.use(cors());

// dbconncect
import { dbConnet } from "./src/config/dbConfig.js";
dbConnet();

import taskRouter from "./src/routers/taskRouter.js";
app.use("/api/v1/task", taskRouter);

//Static content serve
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/FrontEnd/build")));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/FrontEnd/build/index.html"));
});

app.use((error, req, res, next) => {
  console.log(error);
  res.json({
    status: "error",
    message: error.message,
  });
});
app.listen(PORT, (error) => {
  error && console.log(error);
  console.log(`server running at http://localhost:${PORT}`);
});
