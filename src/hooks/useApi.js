import axios from 'axios';
import { useEffect, useState } from 'react';

export const useApi = () => {
  // Endpoint URLs.
  const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  const usersUrl = 'https://jsonplaceholder.typicode.com/users';

  // States.
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  // Effect.
  useEffect(() => {
    async function fetchApis() {
      const postResponse = await axios.get(postsUrl);
      const userResponse = await axios.get(usersUrl);
      setPosts(postResponse.data);
      setUsers(userResponse.data);
    }
    fetchApis();
  }, []);

  return { users, posts }
};
