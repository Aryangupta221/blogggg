import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl p-4 shadow-soft hover:shadow-lg transition-smooth">
        <div className="w-full mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-lg w-full h-48 object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-smooth">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;