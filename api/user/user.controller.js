const { insert, findById, remove } = require("./user.model");

async function createUser(req, res) {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ message: "missing name and/or age" });
  }

  try {
    const user = await insert({ name, age });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: "Unable to create new user" });
  }
}

async function removeUser(req, res) {
  const { id } = req.params;
  try {
    const user = await findById(id);
    if (!user) {
      return res.status(404).json({ message: "user doesn't exist" });
    }
    await remove(id);
    res.status(200).json({ message: "user deleted" });
  } catch (e) {
    res.status(500).json({ message: "Unable to delete user" });
  }
}

module.exports = { createUser, removeUser };
