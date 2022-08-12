import { createAction, createReducer } from "@reduxjs/toolkit";

// ACTIONS
export const setPost = createAction("currentPost/set");
export const clearPost = createAction("currentPost/clear");

// REDUCER
const initialState = 1;
export const reducer = createReducer(initialState, {
  [setPost]: (state, action) => action.payload,
  [clearPost]: (state) => initialState,
});
