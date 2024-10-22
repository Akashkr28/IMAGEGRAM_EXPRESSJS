import { createPostService } from '../services/postService.js';

export async function createPost(req, res) {
    //call the service layer function

    const post = createPostService({
        caption: req.body.caption,
        image: req.body.image,
    })


    return res.status(201).json({ 
        success : true,
        message: 'post created successfully',
        data: post    
    });
}

export async function getAllPosts(req, res) {
    // return unimplemented
    return res.status(501).json({
        success: true,
        message: "Not implemented",
    });
}