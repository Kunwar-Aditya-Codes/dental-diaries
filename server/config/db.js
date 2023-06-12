const { Sequelize } = require("sequelize");

const environment = process.env.NODE_ENV;

/**
 * @desc: New Sequelize instance is created.
 *
 */
let sequelize;
if (environment === "development") {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: "postgres",
      port: process.env.DB_PORT,
      dialectModule: require("pg"),
      host: process.env.DB_HOST,
    }
  );
} else {
  sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialectModule: require("pg"),
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

/**
 * @desc: Test the connection to the database.
 */
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err.message);
  }
};

module.exports = { sequelize, testConnection };
