import * as constants from '../constants/reportConstants';
import axios from 'axios';

export const fetchReports = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.REPORT_FETCH_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/reports', config);

    dispatch({
      type: constants.REPORT_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.REPORT_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchReportById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.REPORT_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/reports/${id}`, config);

    dispatch({
      type: constants.REPORT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.REPORT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createReport = (report) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.REPORT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/reports', report, config);

    dispatch({
      type: constants.REPORT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.REPORT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteReport = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.REPORT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/reports/${id}`, config);

    dispatch({
      type: constants.REPORT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: constants.REPORT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateReport = (report) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.REPORT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/reports/${report._id}`,
      report,
      config
    );

    dispatch({
      type: constants.REPORT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: constants.REPORT_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createCommentReport = (report) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.REPORT_CREATE_COMMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/reports/comment/${report._id}`,
      report,
      config
    );

    dispatch({
      type: constants.REPORT_CREATE_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: constants.REPORT_CREATE_COMMENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteCommentReport = (report) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.REPORT_DELETE_COMMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `/api/reports/comment/${report.reportId}/${report.commentId}`,
      config
    );

    dispatch({
      type: constants.REPORT_DELETE_COMMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: constants.REPORT_DELETE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setReportToBeingProcessed = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.REPORT_TO_BEING_PROCESSED_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/reports/admin/verify/${id}`, {}, config);

    dispatch({
      type: constants.REPORT_TO_BEING_PROCESSED_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: constants.REPORT_TO_BEING_PROCESSED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setReportToDone = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.REPORT_TO_DONE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/reports/admin/clear/${id}`, {}, config);

    dispatch({
      type: constants.REPORT_TO_DONE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: constants.REPORT_TO_DONE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setReportToBeingProcessedAsOfficer = (id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: constants.REPORT_TO_BEING_PROCESSED_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/reports/officer/verify/${id}`, {}, config);

    dispatch({
      type: constants.REPORT_TO_BEING_PROCESSED_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: constants.REPORT_TO_BEING_PROCESSED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setReportToDoneAsOfficer = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.REPORT_TO_DONE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/reports/officer/clear/${id}`, {}, config);

    dispatch({
      type: constants.REPORT_TO_DONE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: constants.REPORT_TO_DONE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
