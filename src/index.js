import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js'
import multer from 'multer';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {options} from './utils/swaggerOptions.js';
import ip from 'ip';
import { rateLimit } from 'express-rate-limit';


const swaggerDocs = swaggerJSDoc(options);
const PORT = 3000; //port number

const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, //  30 seconds
    max: 5 // limit each IP to 5 requests per windowMs
})

app.use(limiter); // apply rate limiter

const app = express(); // create express app server instance

const upload = multer();

app.use(express.json()); // parse incoming requests with JSON payloads
app.use(express.text());
app.use(express.urlencoded());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', apiRouter); // If the url starts with /api then the request is forwaded to the apiRouter



function m1(req, res, next) {
    console.log('m1');
    next();
}

app.use(m1);

app.get('/ping', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.user);
    const ipaddr = ip.address();
    return res.json({ message: 'pong' + ipaddr });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

