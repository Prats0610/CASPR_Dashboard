import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../store/authSlice";
import themeReducer from "../../store/themeSlice";
import uiReducer from "../../store/uiSlice";
import Profile from "../Profile";

function renderSimple() {
  const reducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    ui: uiReducer,
  });
  const store = configureStore({
    reducer,
    preloadedState: {
      auth: {
        user: {
          uid: "1",
          email: "test@example.com",
          displayName: null,
          photoURL: null,
        },
        initializing: false,
        error: null,
      },
    } as any,
  });
  return render(
    <Provider store={store}>
      <Profile />
    </Provider>
  );
}

describe("Profile page (simple)", () => {
  it("renders heading", () => {
    renderSimple();
    expect(screen.getByText(/my profile/i)).toBeInTheDocument();
  });
});
