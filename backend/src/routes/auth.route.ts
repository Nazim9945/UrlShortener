import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";

const route: Router = Router();
route.post("/register", registerUser);
route.post("/login", loginUser);
export default route;