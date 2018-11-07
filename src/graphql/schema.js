import { PubSub, gql, ApolloError } from "apollo-server";
import Artist from "./Artist";
import Fan from "./Fan";

const pubsub = new PubSub();

export const typeDefs = gql`
    type Artist {
        id: String!,
        name: String!
        fans: [Fan]
        profile: String
    }
    type Artists {
        allArtist: [Artist]
    }
    type Fan {
        id: String,
        name: String!
    }

    type Error {
        message: String
    }

    type ArtistCreationPayload {
        artistId: String
        errors: [Error]
    }

    type ArtistDeletionPayload {
        artistId: String
        errors: [Error]
    }

    type ArtistPayload {
        artist: Artist
        artistId: String
        message: String
        errors: [Error]
    }

    type FanPayload {
        fan: Fan
        fanId: String
        message: String
        errors: [Error]
    }

    type FanCreationPayload {
        fanId: String!
        errors: [Error]
    }

    type Query {
        artist(id: String!): Artist!
        artists: [Artist]
        fan(id: Int!): Fan!
        fans: [Fan] 
    }

    type Mutation {
        createArtist(name: String!):  ArtistCreationPayload
        
        deleteArtist(id: String!): ArtistDeletionPayload
        updateArtist(
            id: String!
            name: String
            ): ArtistPayload!

        createFan( name: String!): FanPayload!
        deleteFan( id: String!): FanPayload!
        updateFan(
            id: String!
            name: String
            ): FanPayload!

        artistAddFan( 
            artistId: String! 
            fanId: String!
            ) : Artist
        
        artistRemoveFan(
            artistId: String!
            fanId: String!
        ) : Artist  
    }
`;

export const resolvers = {
    Query: {
        //post: (obj, args, context, info) => Post.getPost(args.id),
        artist: (obj, args, context, info) => {
            return Artist.get(args.id);
        },
        artists: (obj, args, context, info) => Artist.get(),
        fan: (obj, args, context, info) => Fan.get(id),
        fans:  (obj, args, context, info) => {
            return Fan.get()
        },
    },
    Mutation: {
        createArtist: async (obj, args, context, info) => {
            return Artist.create(args)
        },
        updateArtist: (obj, args, context, info) => {
            return Artist.update(args);
        },
        deleteArtist: async (obj, args, context, info) => {
            return Artist.destroy(args.id)
        },
        createFan: (obj, args, context, info) => {
            return Fan.create(args);
        },
        updateFan: (obj, args, context, info) => {
            return Fan.update(args);
        },
        deleteFan: async (obj, args, context, info) => {
            return Fan.destroy(args.id)
        },
        artistAddFan: (obj, args, context, info) => {
            return Artist.addFan(args);
        },
        artistRemoveFan: (obj, args, context, info) => {
            console.log('sanity check');
            return Artist.removeFan(args);
        },
    }
};

export default {
    typeDefs,
    resolvers
};