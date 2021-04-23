import React, { useEffect, useState } from "react";

import axios from "axios";

const Empty = () => (
    <div>No articles found.</div>
);

// const Post = ({userId, id, title, body, author}) => (
//     <li className="post" key={id}>
//         <h4>{title}</h4> {author}
//         <p>{body}</p>
//     </li>
// );

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };
        // Load posts.
        axios
            .get('/posts.json', config)
            .then(resp => resp.data)
            .then(data => {
                setPosts(data);
            })
            .then(
                axios
                    .get('/users.json')
                    .then(resp => resp.data)
                    .then(data => {
                        setAuthors(data);
                    })
                    .catch(err => console.log('There was an error accessing the API', err))
            )
            .catch(err => console.log('There was an error accessing the API', err))
    }, [])

    if (!posts || posts.length === 0) {
        return (<Empty/>);
    }

    return (
        <div
            className="App">
            <h1>Scalable Path - React Test</h1>
            { posts.slice(0, 10).map((post) => {
                const author = authors ? authors.find((item) => item.id === post.userId) : [];
                return (
                    <div
                        className="blogs" key={post.id}>
                        <div
                            className="blogsPost">
                            <h2 className="postTitle">{post.title}</h2>
                            <span key={author.id}>by {author.name}</span>
                            <p className="postbody">{post.body}</p>
                        </div>
                    </div>
                );
            })}
            Written for <img alt="Scalable Path" src="/img/scalable_path_logo.png" width="276" height="45" />
        </div>
    );
}

export default Posts;