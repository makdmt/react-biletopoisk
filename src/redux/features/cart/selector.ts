export const selectCartModule = (state: any) => state.cart;
export const selectItemAmount = (state: any, id: string) =>  selectCartModule(state)[id] || 0;