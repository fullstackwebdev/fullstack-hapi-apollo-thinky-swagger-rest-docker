import { PubSub, gql } from "apollo-server";
import Artist from "./Artist";
import Fan from "./Fan";

const pubsub = new PubSub();
export const typeDefs = gql`
    type Artist {
        id: ID!,
        name: String!
        fans: [Fan]
        profile: String!
    }
    type Fan {
        id: ID!,
        name: String!
    }

    type Error {
        message: String
    }

    type ArtistCreationPayload {
        artistId: String!
        errors: [Error]
    }

    type FanCreationPayload {
        fanId: String!
        errors: [Error]
    }

    type Query {
        artist(id: Int!): Artist!
        fan(id: Int!): Fan!
        artists: [Artist!]
        wtf: String!
    }

    type Mutation {
        createArtist(name: String!): ArtistCreationPayload!
        createFan( name: String!): FanCreationPayload!
        
    }
`;

export const resolvers = {
    Query: {
        //post: (obj, args, context, info) => Post.getPost(args.id),
        artist: (obj, args, context, info) => Artist.getArtist(args.id),
        artists: (obj, args, context, info) => Artist.getArtist(args.id),
        fan: (obj, args, context, info) => Fan.get(id),
    },
    Mutation: {
        createArtist: (obj, args, context, info) => {
            //const { name } = args;
            return Artist.createArtist(args);
        },
        createFan: (obj, args, context, info) => {
            return Fan.create(args);
        },
    }
};

export default {
    typeDefs,
    resolvers
};