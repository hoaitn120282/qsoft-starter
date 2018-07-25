'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,     
    password: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,

    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    google: DataTypes.STRING,
    github: DataTypes.STRING,
    instagram: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    steam: DataTypes.STRING,
    tokens: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};