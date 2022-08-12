import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";

// =====ACTIONS=====
export const createComment = createAction("models/comments/create");
export const deleteComment = createAction("models/comments/delete");
export const updateComment = createAction("models/comments/update");

// =====MODEL=====
export class Comment extends Model {
  static modelName = "Comment";

  static get fields() {
    return {
      id: attr(),
      postId: fk({
        to: "Post",
        as: "post",
        relatedName: "comments",
      }),
      email: attr(),
      body: attr(),
      name: attr(),
    };
  }

  static reducer({ type, payload }, Comment, session) {
    let comment;
    switch (type) {
      case createComment.type: {
        if (!payload.body || !payload.postId) {
          console.warn(
            "Unable to create a comment with no body or post",
            payload
          );
        } else {
          Comment.upsert(payload);
        }
        break;
      }
      case updateComment.type: {
        if (!payload.body || !payload.postId) {
          console.warn(
            "Unable to update a comment with no body or post",
            payload
          );
        } else {
          comment = Comment.withId(payload.id);

          comment.update(payload);
        }
        break;
      }
      case deleteComment.type: {
        let comment = Comment.withId(payload);
        comment.delete();
        break;
      }
      default:
        break;
    }
  }
}
