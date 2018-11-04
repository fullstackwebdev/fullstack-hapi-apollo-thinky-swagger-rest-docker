import fetch from "node-fetch";
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
    }
};

export default Post;