import { MongoClient } from "mongodb";
import config from "./config.js";

const client = new MongoClient(config.mongo_uri);
await client.connect();

const _db = client.db();

let db = _db.collection;
db = db.bind(_db);

export default db;
