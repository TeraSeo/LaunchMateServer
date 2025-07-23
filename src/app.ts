import express from 'express'
import 'reflect-metadata';
import cors from "cors";
import { user_route } from './routes/UserRoute';
import './configs/DbConfig'
import { token_route } from './routes/TokenRoute';
import { launch_route } from './routes/LaunchRoute';

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use("/api/users", user_route);
app.use("/api/tokens", token_route);
app.use("/api/launch", launch_route);

app.listen(8080, () => {
    console.log('Server running')
});