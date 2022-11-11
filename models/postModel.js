import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: 'USER',
    },
    likes: {
      type: [String],
      default: [],
    },
    numberoflikes: {
      type: Number,
      default: 0,
    },
    comments: {
      text: { type: String },
      postedby: { type: String },
      default: {},
    },
  },
  { timestamps: true }
);
const Post = mongoose.model('POST', postSchema);
export default Post;
