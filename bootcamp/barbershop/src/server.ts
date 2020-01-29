import App from "./app";
import { createConnection } from "typeorm";
import User from "./entity/User";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

(async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "example",
      database: "gobarber",
      entities: [User],
      synchronize: true,
      logging: false
    });
  } catch (error) {
    console.log("Error while connecting to the database", error);
    return error;
  }

  const app = new App([new UserController(), new SessionController()], 3333);
  app.listen();
})();
