import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import path from 'path';
import { User } from "../entities/UserEntity";
import { Idea } from "../entities/IdeaEntity";
import { DetailedIdea } from "../entities/DetailedIdeaEntity";

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { DB_DATABASE, DB_USER, DB_HOST, DB_PASSWORD } = process.env;
console.log("Loaded DB env:", DB_HOST, DB_USER, DB_DATABASE);
export const db = new DataSource({
	type: 'mysql',
	host: DB_HOST,
	port: 3306,
	username: DB_USER,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	synchronize: true, // auto table create/update setting
	logging: true,
	entities: [User, Idea, DetailedIdea],
	migrations: [],
	subscribers: []
}); 

db.initialize()
  .then(() => {
    console.log("✅ Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization:", err);
  });	