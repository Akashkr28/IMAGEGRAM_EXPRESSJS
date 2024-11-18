import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 1
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    },
    commentableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    reply: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;