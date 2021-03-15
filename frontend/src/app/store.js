import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userUpdateReducer,
  userDeleteReducer,
} from '../reducers/userReducers';

import {
  reportFetchReducer,
  reportDetailsReducer,
  reportCreateReducer,
  reportDeleteReducer,
  reportUpdateReducer,
  reportCommentCreateReducer,
  reportCommentDeleteReducer,
  reportToBeingProcessedReducer,
  reportToDoneReducer,
} from '../reducers/reportReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  reportList: reportFetchReducer,
  reportDetails: reportDetailsReducer,
  reportCreate: reportCreateReducer,
  reportDelete: reportDeleteReducer,
  reportUpdate: reportUpdateReducer,
  reportCommentCreate: reportCommentCreateReducer,
  reportCommentDelete: reportCommentDeleteReducer,
  reportToBeingProcessed: reportToBeingProcessedReducer,
  reportToDone: reportToDoneReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
