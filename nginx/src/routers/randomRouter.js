const randomRouter = require('express').Router();
const { fork } = require('child_process');

const getRandomNumbers = (req, res) => {
    const { cant } = req.query;
    const child = fork('./lib/randomProcess.js');

    child.on('message', msg => {
        if(msg === 'start') child.send(Number(cant) || 100000000);
        else res.json(msg);
    });
}    
    
randomRouter.get('/', getRandomNumbers);

module.exports = randomRouter;
