export const createSetStart = () => ({
  type: "CREATE_SET_START",
});

export const createSetSuccess = (set) => ({
  type: "CREATE_SET_SUCCESS",
  payload: set,
});

export const createSetFailure = () => ({
  type: "CREATE_SET_FAILURE",
});

export const updateSetStart = () => ({
  type: "UPDATE_SET_START",
});

export const updateSetSuccess = (id, set) => ({
  type: "UPDATE_SET_SUCCESS",
  payload: set,id
});

export const updateSetFailure = () => ({
  type: "UPDATE_SET_FAILURE",
});

export const deleteSetStart = () => ({
  type: "DELETE_SET_START",
});

export const deleteSetSuccess = (id) => ({
  type: "DELETE_SET_SUCCESS",
  payload: id,
});

export const deleteSetFailure = () => ({
  type: "DELETE_SET_FAILURE",
});

export const getAllSetsPublicStart = () => ({
  type: "GET_ALL_SETS_PUBLIC_START",
});

export const getAllSetsPublicSuccess = (sets) => ({
  type: "GET_ALL_SETS_PUBLIC_SUCCESS",
  payload: sets,
});

export const getAllSetsPublicFailure = () => ({
  type: "GET_ALL_SETS_PUBLIC_FAILURE",
});

export const getAllSetsUserStart = () => ({
  type: "GET_ALL_SETS_USER_START",
});

export const getAllSetsUserSuccess = (sets) => ({
  type: "GET_ALL_SETS_USER_SUCCESS",
  payload: sets,
});

export const getAllSetsUserFailure = () => ({
  type: "GET_ALL_SETS_USER_FAILURE",
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

export const getCardToLearnStart = () => ({
  type: "GET_CARD_TO_LEARN_START",
});

export const getCardToLearnSuccess = (id, todo) => ({
  type: "GET_CARD_TO_LEARN_SUCCESS",
  payload: todo,id
});

export const getCardToLearnFailure = () => ({
  type: "GET_CARD_TO_LEARN_FAILURE",
});

export const getCardToReviewStart = () => ({
  type: "GET_CARD_TO_REVIEW_START",
});

export const getCardToReviewSuccess = (id) => ({
  type: "GET_CARD_TO_REVIEW_SUCCESS",
  payload: id,
});

export const getCardToReviewFailure = () => ({
  type: "GET_CARD_TO_REVIEW_FAILURE",
});
