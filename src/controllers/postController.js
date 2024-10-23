import { createPostService, getAllPostsService } from '../services/postService.js';

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
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        const paginatedPosts = await getAllPostsService(offset, limit);

        return res.status(200).json({
            success: true,
            message: "All posts fetched successfully",
            data: paginatedPosts
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        });
    }
}