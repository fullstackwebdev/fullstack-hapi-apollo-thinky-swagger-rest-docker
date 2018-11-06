
import Joi from "joi";
import ArtistModel from '../../model/artist';
import thinky from "thinky";
import Boom from "boom";

export const routes = [
    {
        method: 'GET',
        path: '/artist',
        config: {
            //auth: 'token',
            handler: (request, reply) => {
                //let userId = request.auth.credentials.accountId;
                ArtistModel.getJoin() //userId: userId
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
        path: '/artist/{id}',
        config: {
            //auth: 'token',
            //plugins: {
            //    'hapi-io': 'api:findById'
            //},
            handler: (request, reply) => {
                //let userId = request.auth.credentials.accountId;
                let id = request.params.id;

                ArtistModel.get(id).getJoin().run()
                    .then((artist) => reply(artist))
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
        path: '/artist',
        config: {
            //auth: 'token',
            // plugins: {
            //     'hapi-io': 'api:add'
            // },
            handler: async (request, reply) => {
                //let userId = request.auth.credentials.accountId;
                let artist = new ArtistModel(request.payload);
                //artist.userId = userId;
                await artist.saveAll()
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
        path: '/artist/{id}',
        config: {
            //auth: 'token',
            // plugins: {
            //     'hapi-io': 'api:update'
            // },
            handler: (request, reply) => {
                let id = request.params.id;

                ArtistModel.get(id).run()
                    .then((artist) => artist.merge(request.payload).save()
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
        path: '/artist/{id}',
        config: {
            //auth: 'token',
            // plugins: {
            //     'hapi-io': 'api:delete'
            // },
            handler: (request, reply) => {
                let id = request.params.id;
                ArtistModel.get(id).run()
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