'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },       
      password: {
        type: Sequelize.STRING
      },       
      passwordResetToken: {
        type: Sequelize.STRING
      },       
      passwordResetExpires: {
        type: Sequelize.DATE
      },       
      facebook: {
        type: Sequelize.STRING
      },       
      twitter: {
        type: Sequelize.STRING
      },       
      google: {
        type: Sequelize.STRING
      },       
      github: {
        type: Sequelize.STRING
      },       
      instagram: {
        type: Sequelize.STRING
      },       
      linkedin: {
        type: Sequelize.STRING
      },       
      steam: {
        type: Sequelize.STRING
      },       
      profile: {
        type: Sequelize.STRING
      },       
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};