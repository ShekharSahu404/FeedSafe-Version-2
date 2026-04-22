import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import useUserRouter from "./modules/users/user.routes"
import usePlanRouter from "./modules/plan/plan.route"


const app = express();
app.use(express.json());


app.use("/users", useUserRouter);

app.use("/data", usePlanRouter);


app.use(errorMiddleware);

export default app;