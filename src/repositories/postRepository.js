import post from "../schema/post";

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

export const findAllPosts = async () => {
    try {
        const posts = await post.find();
        return posts;
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
