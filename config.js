require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
  const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

  if (!DATABASE_PASSWORD) {
    console.error("Missing DATABASE_PASSWORD in environment variables.");
    process.exit(1);
  }

  return process.env.NODE_ENV === "test"
    ? "postgresql:///jobly_test"
    : process.env.DATABASE_URL || `postgresql://robert:${encodeURIComponent(DATABASE_PASSWORD)}@localhost:5432/jobly`;
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR:".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
