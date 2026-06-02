import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { addFeedback, getFeedbackProjectWise } from "./feedback.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { validateAddFeedbackInput } from "./feedback.validation";

const router = Router();

// router.get("/getAll", authMiddleware, asyncHandler(getAllProject));
router.post("/add",validateAddFeedbackInput ,asyncHandler(addFeedback));
router.get("/project/:projectId", authMiddleware, asyncHandler(getFeedbackProjectWise));
// router.delete("/delete/:projectId", authMiddleware, asyncHandler(deleteProject));
// router.get("/:id", authMiddleware, asyncHandler(getAllPlan));

export default router;