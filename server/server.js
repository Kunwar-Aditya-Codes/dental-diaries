require("dotenv").config();
require("express-async-errors");
require("./config/associations");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { sequelize, testConnection } = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

/**
 * @desc: Routes.
 */
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/user", require("./routes/userRoute"));

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
