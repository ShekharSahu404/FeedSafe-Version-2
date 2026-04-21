import { Router, Request, Response } from "express";
import { userLogin, userRegistration, getAllUser, deleteUser } from "./user.controller";
import { validateLoginInput, validateRegistrationInput } from "./user.validation";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/register", validateRegistrationInput, asyncHandler(userRegistration));

router.post("/login", validateLoginInput, asyncHandler(userLogin));

router.get("/users", authMiddleware, asyncHandler(getAllUser));

router.delete("/delete/:id", authMiddleware, asyncHandler(deleteUser));

export default router;