import { PubSub, gql } from "apollo-server";
//import Post from "./Post";
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
    # type Profile {
    #     name: String!
    # }

    # type Post {
    #     userId: Int!
    #     id: ID!,
    #     title: String,
    #     body: String
    # }

    type Error {
        message: String
    }
    # type PostCreationPayload {
    #     postId: Int!
    #     errors: [Error]
    # }

    type ArtistCreationPayload {
        artistId: String!
        errors: [Error]
    }

    type FanCreationPayload {
        fanId: String!
        errors: [Error]
    }

    # type Subscription {
    #     movieAddedToUserList: UserListMutation
    #     movieDeletedFromUserList: UserListMutation
    # }
    type Query {
        #post(id: Int!): Post!
        artist(id: Int!): Artist!
        fan(id: Int!): Fan!
    }

    type Mutation {
        # createPost(
        #     postId: Int!): PostCreationPayload!
        createArtist(name: String!): ArtistCreationPayload!
        createFan( name: String!): FanCreationPayload!
        
    }
`;

export const resolvers = {
    // Subscription: {
    //     movieAddedToUserList: {
    //         subscribe: () => pubsub.asyncIterator([MOVIE_ADDED_USER_LIST])
    //     },
    //     movieDeletedFromUserList: {
    //         subscribe: () => pubsub.asyncIterator([MOVIE_DELETED_USER_LIST])
    //     }
    // },
    Query: {
        // post: (obj, args, context, info) => Post.getPost(args.id),
        artist: (obj, args, context, info) => Post.getArtist(args.id),
        fan: (obj, args, context, info) => Fan.get(id),
    },
    Mutation: {
        // createPost: (obj, args, context, info) => {
        //     const { title, body, userId } = args;
        //     return Post.createPost({ title, body, userId });
        // },
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