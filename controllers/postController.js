import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';

//Creating posts

const createPosts = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    res.status(422).json({ error: 'Please add all the fields' });
  }
  const post = await Post.create({
    title,
    body,
    postedBy: req.user,
  });

  if (post) {
    res.status(201).json({
      _id: post.id,
      title: post.title,
      body: post.body,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Post data');
  }
});

const deletepost = asyncHandler(async (req, res) => {
  const { postid } = req.params;
  //   console.log(postid);
  console.log(user._id);
  const delpost = await Post.findByIdAndRemove(postid);
  if (delpost) {
    res.status(202).json({ message: 'Deleted' });
  } else {
    res.status(400);
    throw new Error('Error in Deleting');
  }
});

const getposts = asyncHandler(async (req, res) => {
  const post = await Post.find();

  if (post) {
    res.status(201).json({
      post,
    });
  }
});

const getsingleposts = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const getpost = await Post.findById(id);

  const len = getpost.comments.text.length;
  console.log(len);
  if (getpost) {
    res.status(201).json({
      likes: getpost.numberoflikes,
      comment: len,
    });
  }
});

const likepost = asyncHandler(async (req, res) => {
  const { postid } = req.params;
  const lkpost = await Post.findById(postid);
  //   console.log(lkpost);
  const index = lkpost.likes.findIndex((id) => id === String(req.user._id));
  //   console.log(index);
  if (index === -1) {
    const likedPost = await Post.findByIdAndUpdate(
      postid,
      {
        $push: { likes: req.user._id },
        numberoflikes: lkpost.likes.length + 1,
      },
      { new: true }
    );
    res.status(201).json(likedPost);
  } else {
    res.status(400);
    throw new Error('Already Liked the Post');
  }
});

const unlikepost = asyncHandler(async (req, res) => {
  const { postid } = req.params;
  const lkpost = await Post.findById(postid);
  const unlikedPost = await Post.findByIdAndUpdate(
    postid,
    { $pull: { likes: req.user._id }, numberoflikes: lkpost.likes.length - 1 },
    { new: true }
  );
  res.status(201).json(unlikedPost);
});

const comment = asyncHandler(async (req, res) => {
  const { postid } = req.params;
  console.log(postid);
  const commenting = {
    text: req.body.text,
    postedby: req.user._id,
  };
  //   console.log(commenting);

  const cmnt = await Post.findByIdAndUpdate(
    postid,
    {
      $push: { comments: commenting },
    },
    { new: true }
  );
  console.log(cmnt.comments);

  res.status(201).json(cmnt.comments);

  //   res.status(400);
  //   throw new Error('Something went wrong');
});

export {
  createPosts,
  deletepost,
  likepost,
  unlikepost,
  comment,
  getposts,
  getsingleposts,
};
