import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from './features/cart/index';
import { biletopoiskApi } from "@/services/biletopoisk-api";


export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        [biletopoiskApi.reducerPath]: biletopoiskApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([biletopoiskApi.middleware]),
    devTools: process.env.NODE_ENV !== 'production'
});