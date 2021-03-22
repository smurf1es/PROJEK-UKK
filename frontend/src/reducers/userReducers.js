import * as constants from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case constants.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      };
    case constants.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case constants.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case constants.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      };
    case constants.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const adminRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.ADMIN_CREATE_REQUEST:
      return {
        loading: true,
      };
    case constants.ADMIN_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        admin: payload,
      };
    case constants.ADMIN_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const officerRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.OFFICER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case constants.OFFICER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        officer: payload,
      };
    case constants.OFFICER_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: payload,
      };
    case constants.USER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case constants.USER_DETAILS_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: payload,
      };
    case constants.USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case constants.USER_LIST_SUCCESS:
      return {
        loading: false,
        users: payload,
      };
    case constants.USER_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case constants.USER_LIST_RESET:
      return {
        users: [],
      };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case constants.USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case constants.USER_UPDATE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case constants.USER_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case constants.USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case constants.USER_DELETE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
