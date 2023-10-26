import { model, Schema } from 'mongoose';
// import mongoose from 'mongoose';

const postSchema = new Schema({
	body: String,
	username: String,
	createdAt: String,
	comments: [
		{
			username: String,
			body: String,
			createdAt: String,
		},
	],
	likes: [{ username: String, createdAt: String }],
	user: { type: Schema.Types.ObjectId, ref: 'users' },
});

// export default mongoose.model('Post', postSchema);
// const PostModel = mongoose.model('Post', postSchema);
// export { PostModel };
// export default mongoose.model('Post', new postSchema());

export const Post = model('Post', postSchema);
// export const schema = Post.schema;
// export const Post;
