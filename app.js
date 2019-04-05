const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500, handle400, handle422 } = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handle422);
app.use(handle400);
app.use(handle500);

module.exports = app;
