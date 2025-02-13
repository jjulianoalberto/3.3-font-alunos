import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import todosReducer from "./slices/todoSlices";
import assessmentsReducer from "./slices/assessmentsSlice";
import modalReducer from "./slices/modalSlice";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";
import loadingReducer from "./slices/loadingSlice";
import paginationReducer from "./slices/loadingSlice";

const rootReducer = combineReducers({
  todos: todosReducer,
  assessments: assessmentsReducer,
  modal: modalReducer,
  user: userReducer,
  theme: themeReducer,
  loading: loadingReducer,
  pagination: paginationReducer,
});

export const persistedReducer = persistReducer(
  {
    key: "students",
    storage,
  },
  rootReducer
);
