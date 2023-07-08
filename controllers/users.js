const authService = require("../services/auth");
const userService = require("../services/user");
const error = require("../utils/error");

const getUsers = async (req, res, next) => {
  /**
   * Filter, Sort, Pagination
   */
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getUserByID = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(201).json({ message: "User Created Successfully", user });
  } catch (e) {
    next(e);
  }
};

const putUserByID = (req, res, next) => {};

const patchUserByID = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus } = req.body;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    user.name = name ?? user.name; // user.name === undefined ? user.name : name
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();
    return res.status(200).json({ message: "User updated", user });
  } catch (e) {
    next(e);
  }
};

const deleteUserByID = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    await user.deleteOne();
    return res.status(203).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUsers,
  getUserByID,
  postUser,
  putUserByID,
  patchUserByID,
  deleteUserByID,
};
