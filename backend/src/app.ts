import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import useRouter from "./modules/users/user.routes"

const app = express();
app.use(express.json());


app.use("/users", useRouter);


app.use(errorMiddleware);

export default app;