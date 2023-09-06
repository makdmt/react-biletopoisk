import { createSlice } from "@reduxjs/toolkit";


export interface ICart {
    [id: string]: number;
}

const initialState: ICart = {};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: (state, { payload }) => {
            const count = state[payload] || 0;
            if (count === 30) return;
            state[payload] = count + 1;
        },

        decrement: (state, { payload }) => {
            const count = state[payload];
            if (!count) {
                return;
            }

            if (count === 1) {
                delete state[payload];
                return;
            }

            state[payload] = count - 1;
        },

        delete: (state, { payload }) => {
            delete state[payload];
        },

        reset: () => initialState,
    }
});

export const cartActions = cartSlice.actions;
