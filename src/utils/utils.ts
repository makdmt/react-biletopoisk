export const isMobile = (screenWidth: number = 550): boolean => {
    if (typeof window === "object") return window.innerWidth <= screenWidth ? true : false;
    return false;
}

export const filterByFirtsCharsInWords = (strBeginning: string, arr: Array<string>) => {
    return arr.filter(str => {
        const splittedStr = str.split(' ');
        return splittedStr.some(word => word.slice(0, strBeginning.length).toLowerCase() === strBeginning.toLowerCase())
    })
}

export async function wait(ms: number): Promise<void> {
    const wait: Promise<null> = new Promise((res, rej) => {
        setTimeout(() => {
            res(null);
        }, ms)
    });
    await wait;
}