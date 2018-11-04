import fetch from "node-fetch";
import ArtistModel from './../model/artist';

const Post = {
    getPost: async (number) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const json = await response.json();
        return json;
    },
    createPost: async (props) => {
        console.log(props);
        return {
            postId: 123,
            errors: []
        };
    },
    getArtist: async () => {
        ArtistModel.getJoin() //.filter({userId: userId})
            .run()
            .then((results) => {
                return results;
            });
    },
    createArtist: async(args) => {
        ArtistModel(args).saveAll().then( (results) => {
            return results;
        });
    }
};

export default Post;