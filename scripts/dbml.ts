import { sqliteGenerate } from "drizzle-dbml-generator";

import * as schema from "@/db/schema";

const out = "./db/schema.dbml";
const relational = true;

sqliteGenerate({ schema, out, relational });
