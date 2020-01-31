import App from "./app";
import { createConnection } from "typeorm";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import ProviderController from "./app/controllers/ProviderController";
import AppointmentController from "./app/controllers/AppointmentController";
import ScheduleController from "./app/controllers/ScheduleController";
import NotificationController from "./app/controllers/NotificationController";

(async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "example",
      database: "gobarber",
      entities: ["./src/entity**/*.ts"],
      synchronize: true,
      logging: false
    });
  } catch (error) {
    console.log("Error while connecting to the database", error);
    return error;
  }

  const app = new App(
    [
      new UserController(),
      new SessionController(),
      new FileController(),
      new ProviderController(),
      new AppointmentController(),
      new ScheduleController(),
      new NotificationController()
    ],
    3333
  );
  app.listen();
})();
