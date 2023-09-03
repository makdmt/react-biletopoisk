import React, { useCallback } from 'react';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

export function useDebounce(fn: Function | undefined, delay: number) {

    const timer = React.useRef<TimeoutId | null>(null);

    const kill = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
    }

    if (fn) {
        return function (...args: any) {
            kill();

            timer.current = setTimeout(() => {
                fn(...args);

            }, delay)
        }
    }
}
