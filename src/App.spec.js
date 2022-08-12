import React from "react";
import App from "./App";
import { render } from "./test-utils";

describe("App", () => {
  let view;

  beforeEach(() => {
    view = render(<App />);
  });

  it("renders without crashing", () => {
    expect(view.getByTestId("App")).toBeInTheDocument();
  });
});
