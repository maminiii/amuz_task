import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
/* This example requires Tailwind CSS v2.0+ */
import { EmojiHappyIcon, EmojiSadIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SimpleWithIcon({ postList, userId }) {
  const dispatch = useDispatch();
  const [newPostList, setNewPostList] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(1);
  useLayoutEffect(() => {
    if (postList)
      setNewPostList(() => {
        return postList.map((item) => {
          return {
            ...item,
            icon: item.completed ? EmojiHappyIcon : EmojiSadIcon,
          };
        });
      });
  }, [postList]);
  useEffect(() => {
    return () => {
      //dispatch(setPost(selectedPostId));
    };
  }, [selectedPostId]);

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {newPostList.map((post, idx) => (
          <li key={post.id}>
            <div className="relative pb-8">
              {idx !== newPostList.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      post.completed ? "bg-blue-500" : "bg-red-500",
                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                    )}
                  >
                    <post.icon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      <Link
                        to={`/postlist/${userId}/detailview/${post.id}`}
                        key={post.id}
                        style={{ textDecoration: "none" }}
                        className="font-medium text-gray-900"
                      >
                        {post.title}
                      </Link>
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <div>{post.completed ? "완료" : "미완료"}</div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
