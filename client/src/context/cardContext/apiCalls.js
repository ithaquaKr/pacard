import axios from "axios";
import {
  createCardFailure,
  createCardStart,
  createCardSuccess,
  updateCardFailure,
  updateCardStart,
  updateCardSuccess,
  deleteCardFailure,
  deleteCardStart,
  deleteCardSuccess,
  getCardsFailure,
  getCardsStart,
  getCardsSuccess,
} from "./CardActions";

export const getCards = async (dispatch) => {
  dispatch(getCardsStart());
  try {
    const res = await axios.get("/api/cards", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getCardsSuccess(res.data));
  } catch (err) {
    dispatch(getCardsFailure());
  }
};

//create
export const createCard = async (card, dispatch) => {
  dispatch(createCardStart());
  try {
    const res = await axios.post("/api/cards", card, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createCardSuccess(res.data));
  } catch (err) {
    dispatch(createCardFailure());
  }
};

//update
export const updateCard = async (id, card, dispatch) => {
  dispatch(updateCardStart());
  try {
    const res = await axios.put("/api/cards/" + id, card, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateCardSuccess(res.data));
  } catch (err) {
    dispatch(updateCardFailure());
  }
};


//delete
export const deleteCard = async (id, dispatch) => {
  dispatch(deleteCardStart());
  try {
    await axios.delete("/api/cards/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteCardSuccess(id));
  } catch (err) {
    dispatch(deleteCardFailure());
  }
};
