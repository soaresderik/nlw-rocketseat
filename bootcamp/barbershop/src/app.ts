import "reflect-metadata";
import * as express from "express";
import HttpException from "./app/exceptions/HttpException";
import Controller from "./app/controllers/Controller";

class App {
  private app: express.Application;
  private port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.initializeControllers(controllers);
    this.errorMiddleware();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(this.loggerMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
  }

  private loggerMiddleware(
    request: express.Request,
    response: express.Response,
    next
  ) {
    console.log(`${request.method} ${request.path}`);
    next();
  }

  private async errorMiddleware() {
    this.app.use(
      async (
        error: HttpException,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.log(error);
        const message = error.message || "Something went wrong";
        const status = error.status || 500;
        res.status(status).json({ status, message });
      }
    );
  }

  public listen() {
    return this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
