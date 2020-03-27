const express = require('express');

const NGOController = require('./controllers/NGOController')
const IncidentController = require('./controllers/IncidentController')
const NGOIncidentController = require('./controllers/NGOIncidentController')
const SessionController = require('./controllers/SessionController')


const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/ngo', NGOController.index);
routes.post('/ngo', NGOController.create);

routes.get('/ngo/incident', NGOIncidentController.index);

routes.get('/incident', IncidentController.index);
routes.post('/incident', IncidentController.create);
routes.delete('/incident/:id', IncidentController.delete);

module.exports = routes;