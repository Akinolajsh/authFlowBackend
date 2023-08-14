import express, { Router } from "express";
import { authRegister, authSignIn, getOneUser, getUser } from "../controller/authFlowController";
import { upload } from "../config/multer";

const router = express.Router();

router.route("/register").post(upload, authRegister);
router.route("/sign-in").post(authSignIn);
router.route("/get-user").get(getUser);
router.route("/:authID/get-one-user").get(getOneUser);

export default router