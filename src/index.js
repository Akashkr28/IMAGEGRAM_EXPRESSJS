import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js'
import multer from 'multer';

const PORT = 3000; //port number

const app = express(); // create express app server instance

const upload = multer();

app.use(express.json()); // parse incoming requests with JSON payloads
app.use(express.text());
app.use(express.urlencoded());


app.use('/api', apiRouter); // If the url starts with /api then the request is forwaded to the apiRouter

function m1(req, res, next) {
    console.log('m1');
    next();
}

app.use(m1);

app.get('/ping', (req, res) => {
    return res.json({ message: 'pong' });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});