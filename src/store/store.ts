import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, Action } from 'redux'
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
// import type { ThunkAction, UnknownAction } from '@reduxjs/toolkit';

import { contactsApiSlice } from './contacts'
import { groupsApiSlice } from './groups'


const rootReducer = combineReducers({
  [contactsApiSlice.reducerPath]: contactsApiSlice.reducer,
  [groupsApiSlice.reducerPath]: groupsApiSlice.reducer,
});

// Определение RootState на основе корневого редьюсера
export type RootState = ReturnType<typeof rootReducer>;

// Создаем redux-store
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  // Формируем список middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contactsApiSlice.middleware, groupsApiSlice.middleware),
});


// Создаем хук для доступа к dispatch с правильной типизацией
// При исп-ии rtk-query (см. createApi) в хранилище все же м.б. другие редьюсеры на базе rtk-Slices (см. createSlice), например для выполнения обычных синхронных Action
export const useAppDispatch = useDispatch<ThunkDispatch<RootState, void, Action>>  // или UnknownAction из @reduxjs/toolkit

// Альтернативы:
// export const useAppDispatch = useDispatch<ThunkDispatch<RootState, void, Action>>  // ThunkDispatch из redux-thunk

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;

// Определяем тип для AppDispatch, включая thunk-функции
// export type AppDispatch = typeof store.dispatch & {
//   <R, T>(thunk: ThunkAction<R, RootState, any, any>): R;  // ThunkAction из @reduxjs/toolkit
// }
// export const useAppDispatch = () => useDispatch<AppDispatch>();

