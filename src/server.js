
import Hapi from "hapi";
import { ApolloServer, gql } from "apollo-server-hapi";
import { typeDefs, resolvers } from "./graphql/schema";
import HapiSwagger from "hapi-swagger";
import Inert from "inert";
import Vision from "vision";
import Routes from "./api/routes";


const HOST = "0.0.0.0";
const PORT = 8081;


async function StartServer() {
    const server = new ApolloServer({
        // customize the context for access by any resolvers
        context: ({ request }) => {
            // if (!request.headers.cookie) { return { cookieData: undefined }; }
            // return {
            //     cookieData: cookie.parse(request.headers.cookie)["cookieData"]
            // };
        },
        typeDefs,
        resolvers,
        // mocks should be set to false when ready to test against the real api
        mocks: false
    });

    const app = new Hapi.server({
        port: PORT,
        host: HOST,
        routes: {
            cors: {
                // specify the urls of any web application that will need to access this service
                origin: ["http://localhost:3000", "https://my.production.website.tld"],
                credentials: true
            }
        }
    });

    var plugins = [
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'API',
                    //version: Pack.version
                }
            }
        },
        Routes
    ];
    await app.register(plugins);


    await server.applyMiddleware({
        app,
    });

    await server.installSubscriptionHandlers(app.listener);

    await app.start();
}

StartServer().catch(error => console.log(error));
