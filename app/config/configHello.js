import express from "express";
const configRouter = express.Router();

configRouter.get('/', (req, res) => {
    res.send('Hello World from config!');
});

export default configRouter;
