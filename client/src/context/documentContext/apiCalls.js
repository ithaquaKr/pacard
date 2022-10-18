import axios from "axios";
import {
  createDocumentFailure,
  createDocumentStart,
  createDocumentSuccess,
  updateDocumentFailure,
  updateDocumentStart,
  updateDocumentSuccess,
  deleteDocumentFailure,
  deleteDocumentStart,
  deleteDocumentSuccess,
  getDocumentsFailure,
  getDocumentsStart,
  getDocumentsSuccess,
} from "./DocumentActions";

export const getDocuments = async (dispatch) => {
  dispatch(getDocumentsStart());
  try {
    const res = await axios.get("/api/documents", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getDocumentsSuccess(res.data));
  } catch (err) {
    dispatch(getDocumentsFailure());
  }
};
//Get my documents
export const getMyDocuments = async (dispatch) => {
  dispatch(getDocumentsStart());
  try {
    const res = await axios.get("/api/documents/mydocuments", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getDocumentsSuccess(res.data));
  } catch (err) {
    dispatch(getDocumentsFailure());
  }
};


//create
export const createDocument = async (document, dispatch) => {
  dispatch(createDocumentStart());
  try {
    const res = await axios.post("/api/documents", document, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createDocumentSuccess(res.data));
  } catch (err) {
    dispatch(createDocumentFailure());
  }
};

//update
export const updateDocument = async (id, document, dispatch) => {
  dispatch(updateDocumentStart());
  try {
    const res = await axios.put("/api/documents/" + id, document, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateDocumentSuccess(res.data));
  } catch (err) {
    dispatch(updateDocumentFailure());
  }
};


//delete
export const deleteDocument = async (id, dispatch) => {
  dispatch(deleteDocumentStart());
  try {
    await axios.delete("/api/documents/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteDocumentSuccess(id));
  } catch (err) {
    dispatch(deleteDocumentFailure());
  }
};
