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
    tokens: { 
        type: DataTypes.STRING, 
        get: function() {
            return JSON.parse(this.getDataValue('tokens'));
        }, 
        set: function(val) {
            return this.setDataValue('tokens', JSON.stringify(val));
        }
    },
    profile: { 
        type: DataTypes.STRING, 
        get: function() {
            return JSON.parse(this.getDataValue('profile'));
        }, 
        set: function(val) {
            return this.setDataValue('profile', JSON.stringify(val));
        }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};