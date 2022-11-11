import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//Authorizing the user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Get User Profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      followers: user.followers.length,
      following: user.following.length,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const follow = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userr = await User.findById(id);
  // console.log(user);
  console.log('hello1');
  const index = userr.followers.findIndex((id) => id == req.user._id);
  console.log('hello2');
  console.log(req.user._id);

  const varw = req.user._id;

  if (index === -1) {
    const followers = await User.findByIdAndUpdate(
      id,
      { $push: { followers: varw } },
      { new: true }
    );
    const following = await User.findByIdAndUpdate(
      varw,
      {
        $push: { following: id },
      },
      { new: true }
    );
    res.status(201).json({ followers, following });
  } else {
    res.status(400);
    throw new Error('Already Followed');
  }
});

const unfollow = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const varw = req.user._id;

  const followers = await User.findByIdAndUpdate(
    id,
    { $pull: { followers: varw } },
    { new: true }
  );
  const following = await User.findByIdAndUpdate(
    varw,
    {
      $pull: { following: id },
    },
    { new: true }
  );
  res.status(201).json({ followers, following });
});

export { authUser, registerUser, follow, unfollow, getUserProfile };
