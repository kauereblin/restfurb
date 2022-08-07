import "reflect-metadata";
import express from 'express';

import "./database/dataSource"
import routes from './routes';

import swaggerUI from "swagger-ui-express";
import * as swaggerDocs from "./swagger.json"

const app = express();
app.use(express.json());
app.use(routes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(8080, () => console.log("Server is running!"));
