import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status); // Check if user is logged in
  const userData = useSelector((state) => state.auth.userData); // Get user data (including userId)

  useEffect(() => {
    if (authStatus && userData?.$id) { // Ensure user is logged in before fetching
      appwriteService.getPosts(userData.$id).then((posts) => {
        if (posts) {
          console.log('Fetched user-specific posts:', posts.documents); // Debugging
          setPosts(posts.documents);
        }
      }).catch((error) => {
        console.error('Error fetching posts:', error);
      });
    } else {
      setPosts([]); // Clear posts when user logs out
    }
  }, [authStatus, userData]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Container>
        {/* Hero Section */}
        <section className="py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to BlogCraft - Your Blog Creation Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Create, edit, and share your blog posts with ease...
          </p>
          {!authStatus && (
            <div className="mt-6">
              <Link
                to="/login"
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-smooth"
              >
                Log In to Start Blogging
              </Link>
            </div>
          )}
        </section>

        {/* Posts Section */}
        {posts.length > 0 ? (
          <section className="py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Your Blog Posts
            </h2>
            <div className="flex flex-wrap -mx-2">
              {posts.map((post) => (
                <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="w-full py-8 mt-4 text-center">
            <h1 className="text-2xl font-bold text-gray-600">
              {authStatus ? 'No posts available yet. Create one now!' : ''}
            </h1>
            {authStatus && (
              <Link
                to="/add-post"
                className="mt-4 inline-block px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                Create Your First Post
              </Link>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;