const { BelongsTo } = require("sequelize");

module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('User', {
      id: {
     type: Sequelize.INTEGER,
     primaryKey: true,
     autoIncrement: true,
   },
   firstname: {
     type: Sequelize.STRING,
     allowNull: false,
   },
   lastname: {
     type: Sequelize.STRING,
     allowNull: false,
   },
   username: {
     type: Sequelize.STRING,
     unique: true,
     allowNull: false,
   },
   password: {
     type: Sequelize.STRING,
     allowNull: false,
   },
   email: {
     type: Sequelize.STRING,
     unique: true,
     allowNull: false,
   },
   phone: {
     type: Sequelize.STRING,
     unique: true,
     allowNull: false,
   },
   created: {
     type: Sequelize.DATE,
     defaultValue: Sequelize.NOW,
   },
   updated: {
     type: Sequelize.DATE,
     defaultValue: Sequelize.NOW,
   },
    });
  
    return User;
  };

  

 
