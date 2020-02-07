module.exports = (Sequelize, config) => {
    const sequelize = new Sequelize(config.db, config.login, config.password, {
        host: config.host,
        dialect: config.dialect,
        define : {
            timestamps : true,
            paranoid : true
        }
    });
    sequelize.authenticate().then(() => {
        console.log('Connection to database successful');
    }).catch((err) => {
        console.log('Unable to connect to database', err);
    });

    const User = require('./user')(Sequelize, sequelize);

    return {
        User,
        sequelize: sequelize,
        Sequelize: Sequelize,
    };
};