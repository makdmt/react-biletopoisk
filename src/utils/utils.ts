export const isMobile = (screenWidth: number = 550): boolean => {
    return window.innerWidth <= screenWidth ? true : false;
}

export async function wait(ms: number): Promise<void> {
    const wait: Promise<null> = new Promise((res, rej) => {
        setTimeout(() => {
            res(null);
        }, ms)
    });
    await wait;
}