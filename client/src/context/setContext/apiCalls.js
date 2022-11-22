import axios from "axios";
import {
  createSetFailure,
  createSetStart,
  createSetSuccess,
  updateSetFailure,
  updateSetStart,
  updateSetSuccess,
  deleteSetFailure,
  deleteSetStart,
  deleteSetSuccess,
  getSetsByClassifyFailure,
  getSetsByClassifyStart,
  getSetsByClassifySuccess,
  getSetByIdPublicFailure,
  getSetByIdPublicStart,
  getSetByIdPublicSuccess,
  getAllSetsPublicFailure,
  getAllSetsPublicStart,
  getAllSetsPublicSuccess,
  getSetByIdUserFailure,
  getSetByIdUserStart,
  getSetByIdUserSuccess,
  getAllSetsUserFailure,
  getAllSetsUserStart,
  getAllSetsUserSuccess,
  voteStarFailure,
  voteStarStart,
  voteStarSuccess,
  addSetFailure,
  addSetStart,
  addSetSuccess,
  getResultFailure,
  getResultStart,
  getResultSuccess,
  createCardFailure,
  createCardStart,
  createCardSuccess,
  updateCardFailure,
  updateCardStart,
  updateCardSuccess,
  deleteCardFailure,
  deleteCardStart,
  deleteCardSuccess,
  getCardToLearnStart,
  getCardToLearnFailure,
  getCardToLearnSuccess,
  getCardToReviewFailure,
  getCardToReviewStart,
  getCardToReviewSuccess
} from "./SetActions";
// import {
//   createCardFailure,
//   createCardStart,
//   createCardSuccess, deleteCardFailure, deleteCardStart, deleteCardSuccess, updateCardFailure,
//   updateCardStart,
//   updateCardSuccess
// } from "../cardContext/CardActions";




// //Get my documents
// export const getMyDocuments = async (dispatch) => {
//   dispatch(getDocumentsStart());
//   try {
//     const res = await axios.get("/api/documents/mydocuments", {
//       headers: {
//         token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
//       },
//     });
//     dispatch(getDocumentsSuccess(res.data));
//   } catch (err) {
//     dispatch(getDocumentsFailure());
//   }
// };


// Create Set
export const createSet = async (set, dispatch) => {
  dispatch(createSetStart());
  try {
    const res = await axios.post("/api/sets", set, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createSetSuccess(res.data));
  } catch (err) {
    dispatch(createSetFailure());
  }
};

// Update Set
export const updateSet = async (id, set, dispatch) => {
  dispatch(updateSetStart());
  try {
    const res = await axios.put("/api/sets/update/" + id, set, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateSetSuccess(res.data));
  } catch (err) {
    dispatch(updateSetFailure());
  }
};


// Delete Set
export const deleteSet = async (id, dispatch) => {
  dispatch(deleteSetStart());
  try {
    await axios.delete("/api/sets/delete/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteSetSuccess(id));
  } catch (err) {
    dispatch(deleteSetFailure());
  }
};

// Add Sets to User

// Get Sets By Classify

// Get Sets By ID Public

// Get All Sets Public
export const getAllSetsPublic = async (dispatch) => {
  dispatch(getAllSetsPublicStart());
  try {
    const res = await axios.get("/api/sets/library", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getAllSetsPublicSuccess(res.data));
  } catch (err) {
    dispatch(getAllSetsPublicFailure());
  }
};

// Get Sets By ID User

// Get All Sets User
export const getAllSetsUser = async (dispatch) => {
  dispatch(getAllSetsUserStart());
  try {
    const res = await axios.get("/api/sets/view", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getAllSetsUserSuccess(res.data));
  } catch (err) {
    dispatch(getAllSetsUserFailure());
  }
};

// Vote Star

// Get Result

// Get Card to Learn
export const getCardToLearn = async (set_id, dispatch) => {
  dispatch(getCardToLearnStart());
  try {
    const res = await axios.get("/api/sets/" + set_id + "/learn", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getAllSetsPublicSuccess(res.data));
  } catch (err) {
    dispatch(getAllSetsPublicFailure());
  }
};


// Create Card
export const createCard = async (set_id, cards, dispatch) => {
  dispatch(createCardStart());
  try {
    const res = await axios.post("/api/sets/"+ set_id + "/addCard", cards, {
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


//delete (Dang gap chut van de)
export const deleteCard = async (set_id, id, dispatch) => {
  dispatch(deleteCardStart());
  try {
    await axios.delete("/api/sets/" + set_id + "/deleteCard/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteCardSuccess(id));
  } catch (err) {
    dispatch(deleteCardFailure());
  }
};
