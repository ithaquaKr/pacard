export const getCardsStart = () => ({
  type: "GET_CARDS_START",
});

export const getCardsSuccess = (todos) => ({
  type: "GET_CARDS_SUCCESS",
  payload: todos,
});

export const getCardsFailure = () => ({
  type: "GET_CARDS_FAILURE",
});

export const createCardStart = () => ({
  type: "CREATE_CARD_START",
});

export const createCardSuccess = (todo) => ({
  type: "CREATE_CARD_SUCCESS",
  payload: todo,
});

export const createCardFailure = () => ({
  type: "CREATE_CARD_FAILURE",
});

export const updateCardStart = () => ({
  type: "UPDATE_CARD_START",
});

export const updateCardSuccess = (id, todo) => ({
  type: "UPDATE_CARD_SUCCESS",
  payload: todo,id
});

export const updateCardFailure = () => ({
  type: "UPDATE_CARD_FAILURE",
});

export const deleteCardStart = () => ({
  type: "DELETE_CARD_START",
});

export const deleteCardSuccess = (id) => ({
  type: "DELETE_CARD_SUCCESS",
  payload: id,
});

export const deleteCardFailure = () => ({
  type: "DELETE_CARD_FAILURE",
});
