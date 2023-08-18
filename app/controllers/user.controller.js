const db = require("../models");
const Users = require("../models/user.model");
const User = db.user;
const Op = db.Sequelize.Op;



// const UserController = {
//   register: async (req, res) => {
//     try {
//       const newUser = await User.create(req.body);
//       res.status(201).json(newUser);
//     }
//      catch (error) {
//       res.status(500).json({ error: 'Registration failed' });
//     }
//   },
// }

// register user
const UserController = {
  register: async (req, res) => {
    const data = {
      "firstname": "om",
      "lastname": "ram",
      "username": "om1",
      "password": "234",
      "email": "qwe",
      "phone": "12323"
    }
    console.log("data1", data);
    try {
      const book = await Users.create(data);
      console.log("book", book);
      res.send(book);
    } catch (err) {
      res.send(err);
    }
  }

}

module.exports = UserController;

