export const isMobile = (screenWidth: number = 550): boolean => {
    return window.innerWidth <= screenWidth ? true : false;
}