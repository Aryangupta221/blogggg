import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-12 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Container>
        {/* Featured Image Section */}
        <div className="relative w-full mb-8 rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
          {/* Overlay for Visual Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          {/* Author Controls */}
          {isAuthor && (
            <div className="absolute top-4 right-4 flex space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-600"
                  className="px-4 py-2 rounded-full text-white font-semibold shadow-md hover:bg-green-700 transition-colors duration-200"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-600"
                className="px-4 py-2 rounded-full text-white font-semibold shadow-md hover:bg-red-700 transition-colors duration-200"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title Section */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="mt-2 w-16 h-1 bg-indigo-600 mx-auto rounded"></div>
        </div>

        {/* Content Section */}
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <div className="prose prose-lg prose-indigo text-gray-800">
            {post.Content ? parse(String(post.Content)) : <p className="text-gray-500 italic">No content available</p>}
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-xl text-gray-600">Loading post...</p>
    </div>
  );
}