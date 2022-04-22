import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

const router = Router();

/* O método handle possui request e response */
router.post("/authenticate", new AuthenticateUserController().handle);

export { router };