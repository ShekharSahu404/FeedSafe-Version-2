import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import useUserRouter from "./modules/users/user.routes"
import useProjectsRouter from "./modules/projects/projects.route"
import userFeedbackRouter from "./modules/feedback/feedback.routes"

const app = express();
app.use(express.json());


app.use("/users", useUserRouter);

app.use("/projects", useProjectsRouter);

app.use("/feedback", userFeedbackRouter);

app.use(errorMiddleware);

export default app;