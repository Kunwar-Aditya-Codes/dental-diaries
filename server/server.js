require("dotenv").config();
require("express-async-errors");
require("./config/associations");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const { sequelize, testConnection } = require("./config/db");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

/**
 * @desc: Routes.
 */
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/user", require("./routes/userRoute"));

/**
 * @desc: Serve static assets if in production.
 */
__dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

/**
 * @desc: Connect to the database and start the server.
 */
testConnection().then(async () => {
  await sequelize.sync({
    alter: true,
  });

  app.listen(process.env.PORT, function () {
    console.log("Server Started !!");
  });
});
