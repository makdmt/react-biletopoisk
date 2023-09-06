import { ICart } from ".";

export const selectCartModule = (state: any): ICart => state.cart;
export const selectItemAmount = (state: any, id: string): number => (selectCartModule(state) as any)[id] || 0;