import React, { useCallback } from 'react';

export function useMediaQuery(maxWidth: number = 550) {

    const [isMobile, setIsMobile] = React.useState(false);

    const mediaQueryHandler = React.useCallback((evt: MediaQueryListEvent) => {
        if (evt.matches) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    },[])

    React.useLayoutEffect(() => {
        const mediaQueryList  = window.matchMedia(`(max-width: ${maxWidth}px)`);
        mediaQueryList .addEventListener('change', mediaQueryHandler);
    },[])

    return isMobile;
}
