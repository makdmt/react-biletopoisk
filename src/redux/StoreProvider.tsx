'use client';

import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export const StoreProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>{children}</Provider>
    )
}