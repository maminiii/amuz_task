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

import {
  createComment,
  deleteComment,
  updateComment,
} from "../store/modelDucks/Comment";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRecoilState } from "recoil";
import { atomIsLoaded } from "../data/atoms";

import FlexBox from "./FlexBox";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CommentContainer({ postId, commentList }) {
  const [comment, setComment] = useState(""); //todo: comment change
  const [postStatus, setPostStatus] = useState("create");
  const [originComment, setOriginComment] = useState({});

  const [toggleViewAll, setToggleViewAll] = useState(false);
  const [isShowTips, setIsShowTips] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [isLoaded, setIsLoaded] = useRecoilState(atomIsLoaded);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (postStatus === "create") {
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
    } else if (postStatus === "update") {
      if (comment)
        dispatch(
          updateComment({
            id: originComment.id,
            postId: originComment.postId,
            email: originComment.email,
            body: comment,
            name: originComment.name,
          })
        );
      setComment("");
      setPostStatus("create");
    }
  };

  /////////////////////////////////////////////////

  const handleDelete = (idx) => {
    dispatch(deleteComment(idx));
  };

  const handleUpdate = (_originComment) => {
    setComment(_originComment.body);
    setOriginComment(_originComment);
    setPostStatus("update");
  };
  const handleViewAll = () => {
    setToggleViewAll((prev) => !prev);
  };
  useEffect(() => {
    if (!toggleViewAll) window.scrollTo(0, 0);
  }, [toggleViewAll]);
  const handleMore = (type, id) => {
    setIsShowTips((prev) => !prev);
    if (type === "enter") setSelectedId(id);
    else if (type === "leave") setSelectedId(9999);
  };

  return (
    <>
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
      {/* avatargroupwithaction */}
      <>
        {/* <Indicator /> */}
        <div className="w-full">
          <div className="flow-root mt-6">
            <div style={{ marginBottom: "10px" }}>
              {`comments: ${commentList.length ? commentList.length : "0"}`}
            </div>
            {commentList.length > 0 ? (
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {commentList.map((item, idx) => {
                  if (toggleViewAll || idx < 3)
                    return (
                      <li key={idx} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {item?.imageUrl ? (
                              <img
                                className="h-8 w-8 rounded-full"
                                src={item?.imageUrl}
                                alt=""
                              />
                            ) : (
                              <img
                                className="h-8 w-8 rounded-full"
                                style={{ backgroundColor: "pink" }}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-medium text-gray-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500 ">
                              {item.body}
                            </p>
                          </div>
                          <div className="flex flex-col justify-center items-stretch h-full">
                            <div
                              onClick={() => {
                                handleUpdate(item);
                              }}
                              className="mb-3 inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Update
                            </div>
                            <div
                              onClick={() => {
                                handleDelete(item.id);
                              }}
                              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Delete
                            </div>
                            {/* <Popover className="relative">
                            <div
                              onMouseEnter={() => handleMore("enter", idx)}
                              onMouseLeave={() => handleMore("leave", idx)}
                              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                            >
                              More
                            </div>
                            <Transition
                              as={Fragment}
                              show={selectedId === idx && isShowTips}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel
                                className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0"
                                style={{ left: "-100px" }}
                              >
                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                  <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 text-xs">
                                    {item.body}
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </Popover> */}
                          </div>
                        </div>
                      </li>
                    );
                })}
              </ul>
            ) : (
              <FlexBox justify="center" style={{ width: "100%" }}>
                no comment
              </FlexBox>
            )}
          </div>
          {commentList.length > 3 && (
            <div className="mt-6">
              <div
                onClick={handleViewAll}
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {toggleViewAll ? "View less" : "View all"}
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
}
