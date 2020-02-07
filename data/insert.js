const fs = require('fs');
const imageFirst = fs.readFileSync(__dirname + '/animals032.png');
const imageSecond = fs.readFileSync(__dirname + '/animals025.png');
const imageTherd = fs.readFileSync(__dirname + '/animals035.png');

module.exports = async function (db) {
    await db.sequelize.sync({force: true});
    return Promise.all([
        db.User.create({
            firstName: "Mike",
            lastName: "Smith",
            image: imageFirst
        }),
        db.User.create({
            firstName: "Aaron",
            lastName: "Stone",
            image: imageSecond
        }),
        db.User.create({
            firstName: "Jhonny",
            lastName: "Depp",
            image: imageTherd
        }),
    ]);
};