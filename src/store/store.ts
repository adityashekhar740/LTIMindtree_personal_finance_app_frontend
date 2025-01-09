import { configureStore } from '@reduxjs/toolkit'
import { UserSlice } from './features/userSlice'
import {TypedUseSelectorHook,useDispatch,useSelector} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig={
key:'root',
storage,
version:1
}
const persistedUserReducer=persistReducer(persistConfig,UserSlice.reducer);
export const store = configureStore({
  reducer: {
    
    users: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export const persistor = persistStore(store);
export const useAppDispatch:()=>typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;
