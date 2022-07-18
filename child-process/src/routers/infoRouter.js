const infoRouter = require('express').Router();

infoRouter.get('/', (req, res) => {
    res.json({
        'Argumentos de entrada': process.argv.slice(2),
        'Nombre de la plataforma (sistema operativo)': process.platform,
        'Versión de node.js': process.version,
        'Memoria total reservada (rss)': process.memoryUsage().rss,
        'Path de ejecución':  process.execPath,
        'Proccess id': process.pid,
        'Carpeta del proyecto': process.cwd()
    });
});

module.exports = infoRouter;