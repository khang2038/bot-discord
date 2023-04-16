import { DataSource } from "typeorm";
import { NotFoundException } from "../exceptions/not-found.exception";
import { config } from "dotenv";
import { Todo } from "src/entities";
config();

export default class Database {
  private static _instance: Database;

  public static get instance() {
    if (!this._instance) {
      this._instance = new Database();
    }

    return this._instance;
  }

  private databases: { name: string; dataSource: DataSource }[] = [
    {
      name: "default",
      dataSource: new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number.parseInt(process.env.DB_PORT as string),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Todo],
        synchronize: true,
      }),
    },
  ];

  async initialize() {
    const initialDatabasePromises = this.databases.map(async (database) => {
      try {
        await database.dataSource.initialize();
        console.log(`Database ${database.name} initialized`);
      } catch (error) {
      }
    });

    await Promise.all(initialDatabasePromises);
  }

  async cleanDatabases() {
    const cleaningPromises = this.databases.map(async (database) => {
      const entities = database.dataSource.entityMetadatas;

      const tableNames = entities
        .map((entity) => `"${entity.tableName}"`)
        .join(", ");

      await database.dataSource.query(`TRUNCATE TABLE ${tableNames} CASCADE;`);
    });

    await Promise.all(cleaningPromises);
  }

  async close() {
    const destroyDatabasePromises = this.databases.map(async (database) =>
      database.dataSource.destroy()
    );

    await Promise.all(destroyDatabasePromises);
  }

  getDataSource(name: string) {
    const target = this.databases.find((item) => item.name === name);

    if (!target) {
      throw new NotFoundException("data_source");
    }

    return target.dataSource;
  }
}
