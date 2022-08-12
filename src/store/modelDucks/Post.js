import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";

// =====ACTIONS=====
export const createPost = createAction("models/posts/create");
export const deletePost = createAction("models/posts/delete");

// =====MODEL=====
export class Post extends Model {
  static modelName = "Post";

  static get fields() {
    return {
      id: attr(),
      userId: fk({
        to: "User",
        as: "user",
        relatedName: "posts",
      }),
      postId: attr(),
      title: attr(),
      completed: attr(),
    };
  }

  static reducer({ type, payload }, Post, session) {
    switch (type) {
      case createPost.type: {
        if (!payload.title || !payload.userId || !payload.id) {
          console.warn("Unable to create a post with no content or user");
        } else {
          //console.log("##post payload", payload);
          Post.upsert(payload);
        }
        break;
      }
      case deletePost.type: {
        let post = Post.withId(payload);
        post.delete();
        break;
      }
      default:
        break;
    }
  }
}
