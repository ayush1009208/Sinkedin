import React from 'react';
import { ThumbsUp, MessageCircle, Share2, Bookmark } from 'lucide-react';

interface FailurePostProps {
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export function FailurePost({ author, content, timestamp, likes, comments }: FailurePostProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center mb-4">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-3">
          <h3 className="font-semibold text-gray-900">{author.name}</h3>
          <p className="text-sm text-gray-500">{author.title}</p>
          <p className="text-xs text-gray-400">{timestamp}</p>
        </div>
      </div>

      <p className="text-gray-800 mb-4">{content}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button className="flex items-center text-gray-600 hover:text-red-500">
          <ThumbsUp className="h-5 w-5 mr-1" />
          <span>{likes}</span>
        </button>
        <button className="flex items-center text-gray-600 hover:text-red-500">
          <MessageCircle className="h-5 w-5 mr-1" />
          <span>{comments}</span>
        </button>
        <button className="flex items-center text-gray-600 hover:text-red-500">
          <Share2 className="h-5 w-5" />
        </button>
        <button className="flex items-center text-gray-600 hover:text-red-500">
          <Bookmark className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}