module.exports = (Sequelize, sequelize) => {
    return sequelize.define('user', {
        id: {     
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        firstName: {     
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: { 
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
          type: Sequelize.BLOB,
          allowNull: false
        },
        pdf: {
          type: Sequelize.BLOB
        }
    });
  };