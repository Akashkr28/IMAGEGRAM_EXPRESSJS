import express from 'express';
import connectDB from './config/dbConfig.js';
import { createPost } from './controllers/postController.js';
import { s3uploader } from './config/multerconfig.js';

const PORT = 3000; //port number

const app = express(); // create express app server instance

app.use(express.json()); // parse incoming requests with JSON payloads
app.use(express.text());
app.use(express.urlencoded());

function m1(req, res, next) {
    console.log('m1');
    next();
}

app.use(m1);

app.get('/ping', (req, res) => {
    return res.json({ message: 'pong' });
});

app.post('/post', s3uploader.single('image'), createPost);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});