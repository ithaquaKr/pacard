const DocumentReducer = (state, action) => {
  switch (action.type) {
    case "GET_DOCUMENTS_START":
      return {
        documents: [],
        isFetching: true,
        error: false,
      };
    case "GET_DOCUMENTS_SUCCESS":
      return {
        documents: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_DOCUMENTS_FAILURE":
      return {
        documents: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_DOCUMENT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_DOCUMENT_SUCCESS":
      return {
        documents: [...state.documents, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_DOCUMENT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPLOAD_DOCUMENT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPLOAD_DOCUMENT_SUCCESS":
      return {
        documents: state.documents.map(
          (document) => document._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPLOAD_DOCUMENT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "DELETE_DOCUMENT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_DOCUMENT_SUCCESS":
      return {
        documents: state.documents.filter((document) => document._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_DOCUMENT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default DocumentReducer;
