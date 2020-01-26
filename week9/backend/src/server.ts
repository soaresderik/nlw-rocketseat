import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as path from "path";
import * as socketio from "socket.io";
import * as http from "http";
import routes from "./routes";
import { IUser } from "./models";

export interface IRequest extends express.Request {
  io?: any;
  connectedUsers?: any;
}

const app = express();
const server = new http.Server(app);
const io = socketio(server);

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-8jekx.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const connectedUsers = [];

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

app.use((req: IRequest, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve("uploads")));
app.use(routes);

server.listen(3000);
