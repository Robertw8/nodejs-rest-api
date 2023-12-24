const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("./contacts");

const {
  register,
  login,
  logout,
  updateUserStatus,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("./auth");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
  register,
  login,
  logout,
  updateUserStatus,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
