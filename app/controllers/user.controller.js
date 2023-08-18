const db = require("../models");
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
const UserController = {
register: async (req, res) => {
  try {
    // Extract user data from request body
    const { firstname, lastname, username, password, email, phone } = req.body;

    // Create a new user
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      password,
      email,
      phone,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}

module.exports = UserController;


// API to register a new user
// app.post('/register', async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     const user = await User.create({
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       username: req.body.username,
//       password: hashedPassword,
//       email: req.body.email,
//       phone: req.body.phone,
//     });

//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });

// API to get all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });

// Add more APIs (login, logout, forgot password, reset password, change password)

// API to add a new contact
// app.post('/contacts', async (req, res) => {
//   try {
//     const contact = await Contact.create({
//       fullname: req.body.fullname,
//       address: req.body.address,
//       contactno: req.body.contactno,
//       zip: req.body.zip,
//       email: req.body.email,
//       created_by: req.body.created_by,
//     });

//     res.status(201).json(contact);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add contact' });
//   }
// });

// API to get user details and their contacts by user ID
// app.get('/user/:id', async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id, {
//       include: Contact,
//     });

//     if (!user) {
//       res.status(404).json({ error: 'User not found' });
//       return;
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch user details' });
//   }
// });
