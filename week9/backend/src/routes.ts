import { Router } from "express";
import * as multer from "multer";
import uploagConfig from "./config/upload";

import SessionController from "./controllers/SessionController";
import SpotController from "./controllers/SpotController";
import DashController from "./controllers/DashController";
import BookingController from "./controllers/BookingController";
import ApprovalController from "./controllers/ApprovalController";
import RejectionController from "./controllers/RejectionController";

const routes = Router();
const upload = multer(uploagConfig);

routes.post("/sessions", SessionController.store);

routes.get("/spots", SpotController.index);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);

routes.get("/dashboard", DashController.show);
routes.post("/spots/:spot_id/bookings", BookingController.store);

routes.post("/bookings/:booking_id/approvals", ApprovalController.store);
routes.post("/bookings/:booking_id/rejections", RejectionController.store);

export default routes;
