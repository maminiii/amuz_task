import { createSelector } from "redux-orm";

import orm from "../orm";
// =====SELECTORS=====
// ALL POSTS
// returns all comments, with the post's name included

export const commentsSelector = createSelector(orm, (session) => {
  const commentModels = session.Comment.all().toModelArray();

  const formattedComments = commentModels.map((comment) => {
    let postId = "";
    if (!comment.postId) {
      console.warn("No post model found for comment: ", comment);
    } else {
      postId = comment.postId;
    }
    return {
      id: comment.id,
      postId,
      email: comment.email,
      body: comment.body,
      name: comment.name,
    };
  });
  return formattedComments;
});

// POSTS BY ID
// e.g.   const postComments = useSelector(state => postCommentsSelector(state, id));
// would return an array of comments for the post with the given id
// (redux-orm style, not used in app)
export const postCommentsSelector = createSelector(
  [orm.Post, orm.Post.comments],
  (post, comments) => {
    if (!comments) return [];
    return comments.map((comment) => ({
      id: comment.id,
      postId: post.id,
      email: comment.email,
      body: comment.body,
      name: comment.name,
    }));
  }
);
