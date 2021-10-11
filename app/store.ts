import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/ChatSlice";
import connectionReducer from "../features/chat/ConnectionSlice";

export const store = configureStore({
  reducer: {
    counter: chatReducer,
    connection: connectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
