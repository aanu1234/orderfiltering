import { Router } from "express";
import { getOrderItems } from "../controllers/ordersController.js";

const routes = Router();

routes.route("/").get(getOrderItems).post(getOrderItems);

export default routes;
