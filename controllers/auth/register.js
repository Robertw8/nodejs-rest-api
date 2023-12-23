const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../middlewares");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const { nanoid } = await import("nanoid");

  if (user) throw HttpError(409, `Email ${email} is already in use`);
  const hashPassword = bcrypt.hashSync(password, 8);
  const verificationCode = nanoid();

  const createdUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken: verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a href='${BASE_URL}/users/verify/${verificationCode}' target='_blank'>Click here to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    user: {
      email: createdUser.email,
      subscription: createdUser.subscription,
    },
  });
};

module.exports = register;
