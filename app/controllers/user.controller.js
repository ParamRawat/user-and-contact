const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Users = require("../models/user.model");
const User = db.user;
const Op = db.Sequelize.Op;

// const UserController = {

  
  const UserController = {

    register: async (req, res) => {
      const { username,firstname, lastname, phone,  email, password } = req.body;
  
      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user with hashed password
        const newUser = await User.create({
          ...req.body,
          firstname,
          lastname,
          username,
          phone,
          email,
          password: hashedPassword,
        });
  
        res.status(201).json(newUser);
      } catch (error) {
        console.log("error",error);
        res.status(500).json({ error: 'Registration failed' });
      }
    },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({where: {email :email}});
      console.log("user",user);
      if (!user) {
        return res.status(401).json({ error: 'Invalid  email' });
      }

      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log("passs",passwordMatch);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

      // Send the token in the response
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  },

  logout: async (req, res) => {
   
    res.status(200).json({ message: 'Logout successful' });
  },
  forgotPassword: async (req, res) => {
    try {
      const email = req.body.email;
      const user = await User.findOne({ where: { email:email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate a reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
      
      // Set the reset token and its expiration in the user's record
      user.resetToken = resetToken;
      user.resetTokenExpiration = new Date(Date.now() + 3600000); // Token valid for 1 hour
      await user.save();

      // Send the reset token to the user's email (you need to implement email sending here)
      // Example: sendResetEmail(email, resetToken);

      res.status(200).json({ message: 'Reset token sent to your email' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send reset token' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { resetToken, newPassword } = req.body;
      const user = await User.findOne({
        where: {
          resetToken: resetToken,
          resetTokenExpiration: { [Op.gt]: new Date() }, // Check if reset token is still valid
        },
      });
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid reset token' });
      }
  
      // Hash the new password and update the user's record
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiration = null;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(500).json({ error: 'Password reset failed' });
    }
  },


  changePassword: async (req, res) => {
    try {
      const userId = req.user.id; // Assuming you've implemented user authentication
      const { currentPassword, newPassword } = req.body;
      const user = await User.findByPk(userId);

      // Compare the provided current password with the user's stored password
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      // Hash the new password and update the user's record
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();

      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Password change failed' });
    }
  },

  
};
    


module.exports = UserController;

