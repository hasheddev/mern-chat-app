import { Router } from "express";

import { verifyToken, verifyRequestData } from "../middleware";
import UserController from "../controllers/UserContoller";
import AuthContoller from "../controllers/AuthController";

const router = Router();

router.post("/users/register", verifyRequestData, UserController.register);
router.get("/users/status", verifyToken, UserController.getUserStatus);
router.get("/users/:id", verifyToken, UserController.getUser);
router.post("/auth/login", AuthContoller.login);
router.get("/auth/logout", verifyToken, AuthContoller.logout);

export default router;
