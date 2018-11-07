
import Joi from "joi";
import ArtistModel from '../../model/artist';
import Boom from "boom";

export const routes = [
    /// CRUD
    {
        method: 'GET',
        path: '/artist',
        handler: async (request, h) => {
            //let userId = request.auth.credentials.accountId;
            try {
                const artists = await ArtistModel.getJoin() //userId: userId
                    .run();
                return artists; 
            } catch ( error ) {
                throw Boom.notFound(error.message);
            }
        },
        config: {
            //auth: 'token',
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
        handler: async (request, h) => {
            //let userId = request.auth.credentials.accountId;
            let id = request.params.id;
            try { 
                const artist = await ArtistModel.get(id).getJoin().run();
                return artist;
            } catch ( error ) {
                throw Boom.notFound(error.message);
            }
        },
        config: {
            //auth: 'token',
            //plugins: {
            //    'hapi-io': 'api:findById'
            //},
            
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
        handler: async (request, h) => {
            try {
                let artist = new ArtistModel(request.payload);
                let response = await artist.saveAll();
                return response; // TODO 201 created

            } catch ( error ) {
                throw Boom.badRequest(error.message);
            }
            // //let userId = request.auth.credentials.accountId;
            
            // //artist.userId = userId;
            // await artist.saveAll()
            //     .then((result) => reply(result))
            //     .catch((e) => reply();
        },
        config: {
            //auth: 'token',
            // plugins: {
            //     'hapi-io': 'api:add'
            // },
            
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
        handler: async (request, h) => {
            try {
                let artist = await ArtistModel.get(id).run();
                let results = await artist.merge(request.payload).save();
                return results;  
            } catch ( error ) {
                throw Boom.badRequest(error.message);
            }
        },
        config: {
            //auth: 'token',
            // plugins: {
            //     'hapi-io': 'api:update'
            // },
            
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
        handler: async (request, h) => {
            try {
                let id = request.params.id;
                let artist = await ArtistModel.get(id).run();
                let response = artist.delete();
                return response;
            } catch ( error ) {
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