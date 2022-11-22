const SetReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_SET_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_SET_SUCCESS":
      return {
        sets: [...state.sets, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_SET_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_SET_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_SET_SUCCESS":
      return {
        sets: state.sets.map(
          (set) => set._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_SET_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "DELETE_SET_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_SET_SUCCESS":
      return {
        sets: state.sets.filter((set) => set._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_SET_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "GET_ALL_SETS_PUBLIC_START":
      return {
        sets: [],
        isFetching: true,
        error: false,
      };
    case "GET_ALL_SETS_PUBLIC_SUCCESS":
      return {
        sets: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_ALL_SETS_PUBLIC_FAILURE":
      return {
        sets: [],
        isFetching: false,
        error: true,
      };
    case "GET_ALL_SETS_USER_START":
      return {
        sets: [],
        isFetching: true,
        error: false,
      };
    case "GET_ALL_SETS_USER_SUCCESS":
      return {
        sets: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_ALL_SETS_USER_FAILURE":
      return {
        sets: [],
        isFetching: false,
        error: true,
      };
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
    case "GET_CARD_TO_LEARN_START":
      return {
        sets: [],
        isFetching: true,
        error: false,
      };
    case "GET_CARD_TO_LEARN_SUCCESS":
      return {
        sets: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_CARD_TO_LEARN_FAILURE":
      return {
        sets: [],
        isFetching: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default SetReducer;
