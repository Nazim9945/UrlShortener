import { Router } from "express";
import { loginUser, meProfile, registerUser, signout } from "../controllers/auth.controller";
import authMiddleWare from "../middlewares/authMidlleware";

const route: Router = Router();
route.post("/register", registerUser);
route.post("/login", loginUser);
route.get('/me',authMiddleWare,meProfile)
route.post("/logout", signout);
export default route;