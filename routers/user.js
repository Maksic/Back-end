const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const db = require('../data/db');
const userRouter = express.Router();

const ReqObj = { resultFalse: 'false', resultTrue: 'true' };
const path = __dirname + "/data";

userRouter.get('/:firstName', async (req, res, next) => {
    if (!req.params.firstName) { res.json(ReqObj.resultFalse); return; }

    const firstName = req.params.firstName;
    let result = {}

    result = await db.User.findAll({
        attributes: ['firstName', 'lastName', 'image'],
        where: {
            firstName: firstName,
            deletedAt: null
        }
    });

    if (!result.length) return res.json(ReqObj.resultFalse);
    else {

        await pdfGenerate(firstName, result);
        await db.User.update({ pdf: fs.readFile(`${path}/pdf/${firstName}.pdf`, function(err) {
            if (err) throw err
            console.log('File pdf load.')
        })},
            {
                where: {
                    firstName: firstName,
                    deletedAt: null 
                }
            }
        );
        res.json(ReqObj.resultTrue);
    }
});

async function pdfGenerate(firstName, result) {
    fs.writeFile(`${path}/images/${firstName}.png`, result[0].image, function(err) {
        if (err) throw err
        console.log('File image saved.')
    });

    let doc = new PDFDocument;
    doc.pipe(fs.createWriteStream(`${path}/pdf/${firstName}.pdf`));
    doc.text(`FirstName: ${result[0].firstName}, LastName: ${result[0].lastName}`)
    //doc.image(`${path}/images/${firstName}.png`);
    doc.end();
    console.log('File pdf save.')
}
module.exports = userRouter;