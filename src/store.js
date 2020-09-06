import { configureStore } from "@reduxjs/toolkit";

import itemsReducer from "./itemsSlice";

export default configureStore({
  reducer: {
    items: itemsReducer,
  },
});
