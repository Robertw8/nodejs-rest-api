const express = require("express");
const {
  register,
  login,
  logout,
  updateUserStatus,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers");
const { ctrlWrapper, validateBody } = require("../../helpers");
const { userAuth, upload } = require("../../middlewares");
const { authSchema, emailSchema } = require("../../models");

const router = express.Router();

router.post("/register", validateBody(authSchema), ctrlWrapper(register));

router.post("/login", validateBody(authSchema), ctrlWrapper(login));

router.get("/current", userAuth, ctrlWrapper(getCurrentUser));

router.get("/logout", userAuth, ctrlWrapper(logout));

router.patch("/:id/subscription", userAuth, ctrlWrapper(updateUserStatus));

router.patch(
  "/avatars",
  userAuth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));

router.post(
  "/verify",
  validateBody(emailSchema),
  ctrlWrapper(resendVerifyEmail)
);

module.exports = router;
