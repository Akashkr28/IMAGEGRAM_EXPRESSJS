import post from "../schema/post.js";

export const createPost = async (caption, image, user) => {
    try {
        // const newPost = await post.create({
        //     caption,
        //     image,
        //     user
        // });
        const newPost = new post({
            caption,
            image,
            user
        });
        await newPost.save();
        return newPost;
    } catch (error) {
        console.log(error);
    }
}

export const findAllPosts = async (offset, limit) => {
    try {
        const posts = await post.find().sort({ createdAt: -1 }).skip(offset).limit(limit);
        return posts;
    } catch (error) {
        console.log(error);
    }
}

export const countAllPosts = async () => {
    try {
        const count = await post.countDocuments();
        return count;
    } catch (error) {
        console.log(error);
    }
}

export const findPostById = async (id) => {
    try {
        const post = await post.findById(id);
        return post;
    } catch (error) {
        console.log(error);
    }
}

export const deletePostById = async (id) => {
    try {
        const post = await post.findByIdAndDelete(id);
        return post;
    } catch (error) {
        console.log(error);
    }
}

export const updatePostById = async (id, updateObject) => {
    try{
        const post = await post.findByIdAndUpdate(id, updateObject, { new: true });
        return post;
    } catch(error) {
        console.log(error);
    }
}