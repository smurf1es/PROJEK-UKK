import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Authenticates the user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      nik: user.nik,
      avatar: user.avatar,
      name: user.name,
      username: user.username,
      phoneNumber: user.phoneNumber,
      isCivilian: user.isCivilian,
      isAdmin: user.isAdmin,
      isOfficer: user.isOfficer,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, nik, phoneNumber, username, password } = req.body;
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    username,
    password,
    nik,
    phoneNumber,
    isCivilian: true,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      nik: user.nik,
      name: user.name,
      username: user.username,
      phoneNumber: user.phoneNumber,
      isCivilian: user.isCivilian,
      isAdmin: user.isAdmin,
      isOfficer: user.isOfficer,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Register a new admin
// @route POST /api/users/register/admin
// @access Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const user = await User.create({
    name,
    username,
    password,
    isAdmin: true,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      isOfficer: user.isOfficer,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Register a new officer
// @route POST /api/users/register/officer
// @access Public
const registerOfficer = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error('Officer already exists');
  }

  const user = await User.create({
    name,
    username,
    password,
    isOfficer: true,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      isOfficer: user.isOfficer,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc GET all users
// @route GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password -nik');
  res.json(users);
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc GET user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc GET user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      nik: user.nik,
      name: user.name,
      username: user.username,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
      isOfficer: user.isOfficer,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // user.name = req.body.name || user.name;
    // user.username = req.body.username || user.username;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.isOfficer = req.body.isOfficer || user.isOfficer;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      isAdmin: updatedUser.isAdmin,
      isOfficer: updatedUser.isOfficer,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.nik = req.body.nik || user.nik;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      nik: updatedUser.nik,
      name: updatedUser.name,
      username: updatedUser.username,
      phoneNumber: updatedUser.phoneNumber,
      isAdmin: updatedUser.isAdmin,
      isOfficer: updatedUser.isOfficer,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

export {
  authUser,
  registerUser,
  registerAdmin,
  registerOfficer,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
