import { HubConnection } from "@microsoft/signalr";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface ConnectionState {
  value: HubConnection | null;
  status: "idle" | "loading" | "failed";
}

const initialState: ConnectionState = {
  value: null,
  status: "idle",
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const {} = connectionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectConnection = (state: RootState) => state.connection.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default connectionSlice.reducer;
