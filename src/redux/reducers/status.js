let initialState = {
  isReveal: false,
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "REVEAL_CARDS":
      state.isReveal = true;
      return { ...state };
    case "RESHUFFLE_CARDS":
      state.isReveal = false;
      return { ...state };

    default:
      return state;
  }
};
export default reducer;
