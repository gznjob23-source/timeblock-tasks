import express from "express";
import tasksRouter from "./routes/tasksRouter.js";
import blocksRouter from "./routes/blocksRouter.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/time-blocks", blocksRouter);

app.listen(3000, () => {
    console.log("Server ready on port 3000");
});