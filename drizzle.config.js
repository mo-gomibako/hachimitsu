/** @type {import('drizzle-kit').Config} */
export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "expo",
};
