import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3 } from './awsConfig.js';
import { AWS_BUCKET_NAME } from './serverConfig.js';

console.log("S3 Bucket Name: ", AWS_BUCKET_NAME);

export const s3uploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            if(!file) {
                return cb(new Error("File not found"))
            }
            if(file.mimetype != "image/jpeg" && file.mimetype != "image/png") {
                return cb(new Error("File type not supported"));
            }
            console.log(file);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // to make sure the key name is unique
            cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.mimetype.split('/')[1]);
        }
    })
}); // uploader is a middleware