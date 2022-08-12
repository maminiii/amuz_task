/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../store/modelDucks/Comment";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TextAreaWithAvatar({ userId, postId }) {
  const [comment, setComment] = useState(""); //todo: comment change
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (comment) {
      dispatch(
        createComment({
          postId: postId,
          email: "anonymous@email.com",
          body: comment,
          name: "anonymous",
        })
      );
      setComment("");
    }
  };
  return (
    <div className="flex items-start space-x-4 w-full">
      <div className="min-w-0 flex-1">
        <form
          // action={`/comment/${userId}/${postId}`}
          // method="POST"
          onSubmit={handlePost}
          className="relative"
        >
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden ">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full py-3 border-0 resize-none  sm:text-sm px-2"
              placeholder="Add your comment..."
              style={{ outline: "none" }}
              value={comment}
              onChange={handleChange}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
