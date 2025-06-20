import express from "express";
import config from "./config.js";
import Rservice from "./routes/service.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/service', Rservice);

app.listen(config.port_web, () => {
  console.log(`> Web server is running in uri [http://localhost:${config.port_web}]`);
})