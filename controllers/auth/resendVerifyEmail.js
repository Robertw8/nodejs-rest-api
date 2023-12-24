const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { sendEmail } = require("../../middlewares");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, "Email not found");
  if (user.verify) throw HttpError(400, "Verification has already been passed");

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a href='${BASE_URL}/users/verify/${user.verificationToken}' target='_blank'>Click here to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
