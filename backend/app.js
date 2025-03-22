var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const cors = require("cors");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: ["https://www.arimon.xyz", "https://arimon.xyz","http://localhost:5173/"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
  })
);
app.use("/", indexRouter);
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

module.exports = app;
