// test-utils.js
import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { numReducer } from "./store/index";
import { reducer as ormReducer } from "./store/orm";

export const createDefaultStore = (initialState) =>
  configureStore({
    reducer: {
      orm: ormReducer,
    },
    preloadedState: initialState,
    numReducer,
  });

function render(
  ui,
  {
    initialState = {},
    store = createDefaultStore(initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
