'use strict';
module.exports = (sequelize, DataTypes) => {
  const food = sequelize.define('food', {
    name: DataTypes.STRING,
    taste: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  food.associate = function(models) {
    // associations can be defined here
  };
  return food;
};