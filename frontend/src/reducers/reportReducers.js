import * as constants from '../constants/reportConstants';

export const reportFetchReducer = (state = { reports: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.REPORT_FETCH_REQUEST:
      return {
        loading: true,
        reports: [],
      };
    case constants.REPORT_FETCH_SUCCESS:
      return {
        loading: false,
        reports: payload,
      };
    case constants.REPORT_FETCH_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const reportCreateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.REPORT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case constants.REPORT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        report: payload,
      };
    case constants.REPORT_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const reportDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.REPORT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case constants.REPORT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case constants.REPORT_DELETE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const reportUpdateReducer = (state = { report: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.REPORT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case constants.REPORT_UPDATE_SUCCESS:
      return {
        loading: false,
        report: payload,
        success: true,
      };
    case constants.REPORT_UPDATE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case constants.REPORT_UPDATE_RESET:
      return { report: {} };
    default:
      return state;
  }
};

export const reportDetailsReducer = (
  state = { report: { comments: [] } },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case constants.REPORT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.REPORT_DETAILS_SUCCESS:
      return {
        loading: false,
        report: payload,
      };
    case constants.REPORT_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const reportCommentCreateReducer = (
  state = { report: { comments: [] } },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case constants.REPORT_CREATE_COMMENT_REQUEST:
      return {
        loading: true,
      };
    case constants.REPORT_CREATE_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        report: payload,
      };
    case constants.REPORT_CREATE_COMMENT_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const reportCommentDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.REPORT_DELETE_COMMENT_REQUEST:
      return {
        loading: true,
      };
    case constants.REPORT_DELETE_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case constants.REPORT_DELETE_COMMENT_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const reportToBeingProcessedReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.REPORT_TO_BEING_PROCESSED_REQUEST:
      return {
        loading: true,
      };
    case constants.REPORT_TO_BEING_PROCESSED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case constants.REPORT_TO_BEING_PROCESSED_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const reportToDoneReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.REPORT_TO_DONE_REQUEST:
      return {
        loading: true,
      };
    case constants.REPORT_TO_DONE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case constants.REPORT_TO_DONE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
