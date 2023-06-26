export const selectCartModule = (state) => state.cart;
export const selectItemAmount = (state, id) =>  selectCartModule(state)[id] || 0;