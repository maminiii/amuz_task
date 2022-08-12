import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { reducer as currentPostReducer } from "./ducks/currentPost";
import { createComment } from "./modelDucks/Comment";
import { createPost } from "./modelDucks/Post";
import { createUser } from "./modelDucks/User";
import { reducer as ormReducer } from "./orm";

const initialState = {
  num: 0,
};
export const numReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        num: state.num + 1,
      };
    default:
      return state;
  }
};

export const add = () => ({
  type: "ADD",
});

const store = configureStore({
  reducer: {
    orm: ormReducer,
    currentPost: currentPostReducer,
    numReducer: numReducer,
  },
});

// add some initial fake data
let userList = [];
let postList = [];
const fetchUser = async () => {
  try {
    const userRes = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    userList = userRes.data;

    userList.forEach((user, idx) => {
      store.dispatch(
        createUser({
          id: idx + 1,
          name: user.name,
          username: user.username,
          email: user.email,
          address: user.address,
          company: user.company,
          phone: user.phone,
          website: user.website,
        })
      );
    });
    console.log("##fetchUser end");
  } catch (e) {
    console.log("##error", e);
  }
};

const fetchPost = async () => {
  try {
    const postRes = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    userList.forEach((user) => {
      let i = 0;

      postRes.data.forEach((post, idx) => {
        if (post.userId === user.id) {
          store.dispatch(
            createPost({
              id: idx + 1,
              userId: post.userId,
              title: post.title,
              completed: post.completed,
              postId: i,
            })
          );
          i++;
        }
      });
    });
    console.log("##fetchPost end");
  } catch (e) {
    console.log("##error", e);
  }
};

const fetchComment = async (itemId) => {
  try {
    for (let idx = 0; idx < 200; idx++) {
      const commentRes = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${idx + 1}`
      );
      const commentList = commentRes.data;

      commentList.forEach((comment) => {
        store.dispatch(
          createComment({
            id: comment.id,
            postId: comment.postId,
            body: comment.body,
            email: comment.email,
            name: comment.name,
          })
        );
      });
    }
    console.log("##fetchComment end");
  } catch (e) {
    console.log("##error", e);
  }
};

const init = () => {
  fetchUser();
  fetchPost();
  fetchComment();
};

init();
export default store;
