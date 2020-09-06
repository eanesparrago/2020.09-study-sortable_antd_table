import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

const itemsAdapter = createEntityAdapter();

const initialState = itemsAdapter.getInitialState({});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    itemsReceived: (state, action) => {
      itemsAdapter.setAll(state, action.payload);
    },
    reorderItems: (state, action) => {
      itemsAdapter.setAll(state, action.payload);
    },
  },
});

export default itemsSlice.reducer;

export const { itemsReceived, reorderItems } = itemsSlice.actions;

export const { selectAll: selectAllItems } = itemsAdapter.getSelectors(
  (state) => state.items
);

export const selectAllItemsWithIndex = createSelector(
  [selectAllItems],
  (items) => items.map((item, index) => ({ ...item, index }))
);
