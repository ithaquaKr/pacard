const CardReducer = (state, action) => {
  switch (action.type) {
    case "GET_CARDS_START":
      return {
        cards: [],
        isFetching: true,
        error: false,
      };
    case "GET_CARDS_SUCCESS":
      return {
        cards: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_CARDS_FAILURE":
      return {
        cards: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_CARD_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_CARD_SUCCESS":
      return {
        cards: [...state.cards, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_CARD_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPLOAD_CARD_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPLOAD_CARD_SUCCESS":
      return {
        cards: state.card.map(
          (card) => card._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPLOAD_CARD_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "DELETE_CARD_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_CARD_SUCCESS":
      return {
        cards: state.cards.filter((card) => card._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_CARD_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default CardReducer;
