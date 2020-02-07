const express = require('express');
const APIRouter = express.Router();
const usersRouter = require('./user');

APIRouter.use('/user', usersRouter);

module.exports = APIRouter;