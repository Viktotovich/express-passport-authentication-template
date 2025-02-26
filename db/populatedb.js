#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;

const client = new Client({
  user: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  port: PGPORT,
  database: PGDATABASE,
});

/*CUSTOM DB LOGIC - based on App reqs*/
/* Session / Auth requirements
https://github.com/voxpelli/node-connect-pg-simple/blob/HEAD/table.sql
*/
const query = `
  CREATE TABLE IF NOT EXISTS "session" (
    "sid" VARCHAR NOT NULL COLLATE "default",
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,
    PRIMARY KEY ("sid")
  );

  CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "user_sessions" ("expire");

  CREATE TABLE IF NOT EXISTS "users_and_passwords" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "username" VARCHAR(255) NOT NULL UNIQUE,
  "hash" VARCHAR NOT NULL,
  "salt" VARCHAR
  );

  CREATE INDEX IF NOT EXISTS "idx_username" ON "users_and_passwords" ("username");
`;

async function start() {
  console.log("seeding");
  try {
    await client.connect();
    await client.query(query);
    console.log("done");
  } catch (err) {
    console.log("Seeding failed: " + err);
  } finally {
    await client.end();
  }
}

start();
