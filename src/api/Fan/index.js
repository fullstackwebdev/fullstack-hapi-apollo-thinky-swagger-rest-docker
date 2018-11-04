
import Joi from "joi";
import FanModel from '../../model/fan';
import thinky from "thinky";

export const routes = [
    {
        method: 'GET',
        path: '/fan',
        config: {
            //auth: 'token',
            handler: (request, reply) => {
                //let userId = request.auth.credentials.accountId;
                FanModel.getJoin() //userId: userId
                    .run()
                    .then((results) => reply(results))
                    .catch((e) => reply(Boom.notFound(e.message)));
            },
            tags: ['api'],
            validate: {
                query: Joi.object().keys({
                    start: Joi.number().min(0),
                    limit: Joi.number().min(1)
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/fan/{id}',
        config: {
            //auth: 'token',
            //plugins: {
            //    'hapi-io': 'api:findById'
            //},
            handler: (request, reply) => {
                //let userId = request.auth.credentials.accountId;
                let id = request.params.id;

                FanModel.get(id).getJoin().run()
                    .then((fan) => reply(fan))
                    .catch((e) => reply(Boom.notFound(e.message)));
            },
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.string().guid()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/fan',
        config: {
            //auth: 'token',
            // plugins: {
            //     'hapi-io': 'api:add'
            // },
            handler: (request, reply) => {
                //let userId = request.auth.credentials.accountId;
                let fan = new FanModel(request.payload);
                //fan.userId = userId;

                fan.saveAll()
                    .then((result) => reply(result))
                    .catch((e) => reply(Boom.badRequest(e.message)));
            },
            tags: ['api'],
            validate: {
                options: {
                    allowUnknown: true
                },
                payload: Joi.object().keys({
                    name: Joi.string().required().min(1).max(60)
                })
            }
        }
    },
    {
        method: 'PUT',
        path: '/fan/{id}',
        config: {
            //auth: 'token',
            // plugins: {
            //     'hapi-io': 'api:update'
            // },
            handler: (request, reply) => {
                let id = request.params.id;

                FanModel.get(id).run()
                    .then((fan) => fan.merge(request.payload).save()
                        .then((results) => reply(results)))
                    .catch((e) => reply(Boom.badRequest(e.message)));
            },
            tags: ['api'],
            validate: {
                options: {
                    allowUnknown: true
                },
                params: {
                    id: Joi.string()
                },
                payload: Joi.object().keys({

                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/fan/{id}',
        config: {
            //auth: 'token',
            // plugins: {
            //     'hapi-io': 'api:delete'
            // },
            handler: (request, reply) => {
                let id = request.params.id;
                FanModel.get(id).run()
                    .then((campaign) => campaign.delete().then((results) => reply(results)))
                    .catch((e) => reply(Boom.badRequest(e.message)));
            },
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.string().guid()
                }
            }
        }
    }
];

export default routes;