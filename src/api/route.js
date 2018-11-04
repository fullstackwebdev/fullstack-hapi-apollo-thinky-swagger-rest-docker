
import Joi from "joi";
import dummyController from "./controller";
//var Controller = require('./controller.js');
//var Model = require('./model.js');


export const plugin = {

    name: 'API Routes',
    version: 'Pack.version',
    once: true,
    multiple: false,

    register: function (server, options, next) {
        // Declare routes
        server.route([
            {
                method: 'GET',
                path: '/api',
                config: {
                    //auth: 'token',
                    handler: (request,reply) => (reply()),//campaignController.index,
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
                path: '/api/{id}',
                config: {
                    //auth: 'token',
                    //plugins: {
                    //    'hapi-io': 'campaign:findById'
                    //},
                    handler: (request, reply) => (reply()),//campaignController.show,
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
                path: '/api',
                config: {
                    //auth: 'token',
                    // plugins: {
                    //     'hapi-io': 'campaign:add'
                    // },
                    handler: (request, reply) => (reply()),//campaignController.store,
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
                path: '/api/{id}',
                config: {
                    //auth: 'token',
                    // plugins: {
                    //     'hapi-io': 'campaign:update'
                    // },
                    handler: (request, reply) => (reply()),//campaignController.update,
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
                path: '/api/{id}',
                config: {
                    //auth: 'token',
                    // plugins: {
                    //     'hapi-io': 'campaign:delete'
                    // },
                    handler: (request, reply) => (reply()),//campaignController.destroy,
                    tags: ['api'],
                    validate: {
                        params: {
                            id: Joi.string().guid()
                        }
                    }
                }
            }
        ]);

        //next();
    }
}

export default plugin;