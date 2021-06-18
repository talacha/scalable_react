import React from  'react';
import { useApi } from '../hooks/useApi';
import './Posts.css';

const Empty = () => (
    <div>No articles found.</div>
);

const Posts = () => {

    // Get the fetched API data.
    const { posts, users } = useApi();
  
    // Combine the two endoints and build the result items.
    const items = () => {
      return posts.map(post => {
        // Author by line.
        users.map(user => {
          if (user.id === post.userId) {
            post.author = `By ${user.name}`;
          }
          return user;
        })
        return post;
      });
    }
    
    return (
      <>
        <div className="App">
            <h1>Scalable Path - React Test</h1>
            {items().length ? items().map(item => (
                <div key={item.id} class='text-left'>
                    <h2 class="capitalize">{item.title}</h2>
                    <span>{item.author}</span>
                    <p>{item.body}</p>
                </div>
            )) : <Empty/> }
        </div>
      </>
    );
  }
  
  export default Posts;