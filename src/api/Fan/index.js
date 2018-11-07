
import Joi from "joi";
import FanModel from '../../model/fan';
import Boom from "boom";

export const routes = [
    {
        method: 'GET',
        path: '/fan',
        handler: async (request, h) => {
            try {
                const fans = await FanModel.getJoin().run();
                return fans;
            } catch (error) {
                throw Boom.notFound(error.message);
            }
        },
        config: {
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
        handler: async (request, h) => {
            try {
                let id = request.params.id;
                const fan = await FanModel.get(id).getJoin().run();
                return fan;
            } catch (error) {
                throw Boom.notFound(error.message);
            }
        },
        config: {
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
        handler: async (request, h) => {
            try {
                let fan = new FanModel(request.payload);
                let response = await fan.saveAll();
                return response;
            } catch (error) {
                Boom.badRequest(error.message);
            }
        },
        config: {
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
        handler: async (request, h) => {
            try {
                let id = request.params.id;
                let fan = await FanModel.get(id).getJoin().run();
                let response = fan.merge(request.payload).save();
                return response;
            } catch (error) {
                Boom.badRequest(error.message);
            }
        },
        config: {
            tags: ['api'],
            validate: {
                options: {
                    allowUnknown: true
                },
                params: {
                    id: Joi.string().required()
                },
                payload: Joi.object().keys({

                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/fan/{id}',
        handler: async (request, h) => {
            try {
                let id = request.params.id;
                let fan = await FanModel.get(id).run();
                let response = fan.delete();
                return response;

            } catch (error) {
                throw Boom.badRequest(error.message);
            }
        },
        config: {
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