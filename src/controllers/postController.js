import { createPostService, getAllPostsService, deletePostService, updatePostService } from '../services/postService.js';

export async function createPost(req, res) {
    //call the service layer function
    if(!req.file || !req.file.location) {
        return res.status(400).json({
                success: false,
                message: "Image is required"
        });
    }

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

export async function deletePost(req, res){
    try {
        const postId = req.params.id;
        const response = await deletePostService(postId);
        if(!response) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: response
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        });
    }
}

export async function updatePost(req, res){
    try {
        console.log("req file", req.file)
        const updateObject = req.body;
        if(req.file) {
            updateObject.image = req.file.location;
        }
        const response = await updatePostService(req.params.id, updateObject);
        return res.status(200).json({
            success: true,
            message: "Post Updated Successfully",
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        });       
    }
}