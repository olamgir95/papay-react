import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

test("renders learn react link", () => {
  const linkElement = screen.getByText(/learn react/i);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(linkElement).toBeInTheDocument();
});
