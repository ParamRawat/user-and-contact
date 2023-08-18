const { BelongsTo } = require("sequelize");

module.exports = (sequelize, Sequelize) => {

    const Contact = sequelize.define('Contact', {
        fullname: Sequelize.STRING,
        address: Sequelize.STRING,
        contactno: Sequelize.INTEGER,
        zip: Sequelize.INTEGER,
        email: Sequelize.STRING,
        created_by: Sequelize.INTEGER,
      });
  

    Contact.associate = (models) => {       
        Contact.belongsTo(models.User, {
          foreignKey: 'created_by',
          as: 'contactWithUser',
          onDelete: 'CASCADE',
        });    
      };
      
    return Contact;
  };




 