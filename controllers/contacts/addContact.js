const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { _id } = req.user;

  const newContact = await Contact.create({ ...req.body, owner: _id });
  res.json(newContact);
};

module.exports = addContact;
