'use strict';
var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var User = sequelize.define('User', {
    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
      unique: true,
    },

    displayName: {
      type: DataType.TEXT(),
    },

    profilePictureUrl: {
      type: DataType.STRING(255),
    },

    gender: {
      type: DataType.STRING(255),
      validate: { isIn: [['male', 'female']] },
    },

    bio: {
      type: DataType.TEXT('long'),
    },

    website: {
      type: DataType.TEXT(),
    },

    birthday: {
      type: DataType.DATEONLY(),
    },

    fbUserId: {
      type: DataType.STRING(),
      unique: true,
    },

    isEmailVerified: {
      type: DataType.BOOLEAN(),
    }
  }, {
    classMethods: {
      associate: function(models) {
        // are we setting this to nationality?
        User.belongsTo(models.Country, {
          as: "homeCountry"
        });

        User.belongsTo(models.University, {
          onDelete: 'CASCADE',
          foreignKey: {
            as: 'homeUniversity',
            allowNull: false
          }
        });

        User.belongsToMany(models.University, {
          as: 'exchangeUniversity',
          through: 'student_exchange_university',
          foreignKey: 'userId'
        });

        User.belongsToMany(models.Group, {
          as: 'user',
          through: 'chat_group',
          foreignKey: 'userId'
        });

        User.hasMany(models.ChatMessage);
      }
    },
    instanceMethods: {
      generateJwt: function() {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
          id: this.id,
          email: this.email,
          displayName: this.displayName,
          profilePictureUrl: this.profilePictureUrl,
          exp: parseInt(expiry.getTime() / 1000),
        }, config.secret);
      }
    }
  });

  return User;
};
