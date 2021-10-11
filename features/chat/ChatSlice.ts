import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface ChatState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: ChatState = {
  value: 0,
  status: "idle",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    //  action: PayloadAction<number> - förväntad action.payload är av typen number
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // increment by amount
      state.value += action.payload;
    },
    decrementByAmout: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { increment, decrement, incrementByAmount, decrementByAmout } = chatSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default chatSlice.reducer;
