import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const dbPath = path.join(import.meta.dirname, "app.db");

const db = new DatabaseSync(dbPath);
export default db;