import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {  // Removed []
      if (posts) {
        console.log('Fetched posts:', posts.documents); // Debug: Log fetched posts
        setPosts(posts.documents);
      }
    }).catch((error) => {
      console.error('Error fetching posts:', error); // Debug: Log any errors
    });
  }, []); // Empty dependency array ensures it runs once on mount
   // Empty dependency array ensures it runs once on mount

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;