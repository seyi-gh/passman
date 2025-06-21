import path from 'path';
import express from "express";
import { fileURLToPath } from 'url';
import Rservice from "./routes/service.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '../../frontend/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../frontend/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/service', Rservice);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home page',
    test: 'This is a test in html message'
  })
});

export default app;