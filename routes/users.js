const userController = require("../controllers/users");

const router = require("express").Router();

/**
 * Get user by id or email
 * @method GET
 */
router.get("/:userId", userController.getUserByID);

/**
 * Update user by id
 * @method PUT
 */
router.put("/:userId", () => {});

/**
 * Update user by id
 * @method PATCH
 */
router.patch("/:userId", userController.patchUserByID);

/**
 * Delete user by id
 * @method DELETE
 */
router.delete("/:userId", userController.deleteUserByID);

/**
 * Get all users, include
 *  - filter
 *  - sort
 *  - pagination
 *  - select properties
 * @method GET
 *
 */
router.get("/", userController.getUsers);

/**
 * Create new user
 */
router.post("/", userController.postUser);

module.exports = router;
