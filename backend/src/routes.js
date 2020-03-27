const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate')

const NGOController = require('./controllers/NGOController')
const IncidentController = require('./controllers/IncidentController')
const NGOIncidentController = require('./controllers/NGOIncidentController')
const SessionController = require('./controllers/SessionController')


const routes = express.Router();

routes.post('/session', celebrate({
  [Segments.BODY]:Joi.object().keys({
    id:Joi.string().required(),
  })
}), SessionController.create);

routes.get('/ngo', NGOController.index);
routes.post('/ngo', celebrate({
  [Segments.BODY]:Joi.object().keys({
    name:Joi.string().required(),
    email:Joi.string().required().email(),
    whatsapp:Joi.string().required().min(10).max(11),
    city:Joi.string().required(),
    fu:Joi.string().required().length(2),
  })
}),NGOController.create);

routes.get('/ngo/incident',celebrate({
  [Segments.HEADERS]:Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), NGOIncidentController.index);

routes.get('/incident', celebrate({
  [Segments.QUERY]:Joi.object().keys({
    page: Joi.number()
  })
}),IncidentController.index);
routes.post('/incident', celebrate({
  [Segments.HEADERS]:Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]:Joi.object().keys({
    title:Joi.string().required(),
    description:Joi.string().required(),
    value:Joi.number().required(),
  })

}),IncidentController.create);
routes.delete('/incident/:id',celebrate({
  [Segments.PARAMS]:Joi.object().keys({
    id:Joi.number().required()
  })
}), IncidentController.delete);

module.exports = routes;