const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./config/database.sqlite',
    logging:false
});

module.exports=sequelize;
