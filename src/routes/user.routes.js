import { Router } from "express";
import registerUser from "../controllers/user.controller.js";

console.log("User Router Loaded");

const router = Router()
router.route("/register").post(registerUser)


export default router;