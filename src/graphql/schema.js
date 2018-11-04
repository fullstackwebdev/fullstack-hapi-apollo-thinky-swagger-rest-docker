import { PubSub, gql } from "apollo-server";
import Post from "./Post";

const pubsub = new PubSub();
export const typeDefs = gql`
    type Post {
        userId: Int!
        id: ID!,
        title: String,
        body: String
    }
    type Error {
        message: String
    }
    type PostCreationPayload {
        postId: Int!
        errors: [Error]
    }
    # type Subscription {
    #     movieAddedToUserList: UserListMutation
    #     movieDeletedFromUserList: UserListMutation
    # }
    type Query {
        post(id: Int!): Post!
    }
    type Mutation {
        createPost(
            postId: Int!): PostCreationPayload!
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
        post: (obj, args, context, info) => Post.getPost(args.id),
    },
    Mutation: {
        createPost: (obj, args, context, info) => {
            const { title, body, userId } = args;
            return Post.createPost({ title, body, userId });
        }
    }
};

export default {
    typeDefs,
    resolvers
};