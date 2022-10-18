export const getDocumentsStart = () => ({
  type: "GET_DOCUMENTS_START",
});

export const getDocumentsSuccess = (documents) => ({
  type: "GET_DOCUMENTS_SUCCESS",
  payload: documents,
});

export const getDocumentsFailure = () => ({
  type: "GET_DOCUMENTS_FAILURE",
});

export const createDocumentStart = () => ({
  type: "CREATE_DOCUMENT_START",
});

export const createDocumentSuccess = (document) => ({
  type: "CREATE_DOCUMENT_SUCCESS",
  payload: document,
});

export const createDocumentFailure = () => ({
  type: "CREATE_DOCUMENT_FAILURE",
});

export const updateDocumentStart = () => ({
  type: "UPDATE_DOCUMENT_START",
});

export const updateDocumentSuccess = (id, document) => ({
  type: "UPDATE_DOCUMENT_SUCCESS",
  payload: document,id
});

export const updateDocumentFailure = () => ({
  type: "UPDATE_DOCUMENT_FAILURE",
});

export const deleteDocumentStart = () => ({
  type: "DELETE_DOCUMENT_START",
});

export const deleteDocumentSuccess = (id) => ({
  type: "DELETE_DOCUMENT_SUCCESS",
  payload: id,
});

export const deleteDocumentFailure = () => ({
  type: "DELETE_DOCUMENT_FAILURE",
});
