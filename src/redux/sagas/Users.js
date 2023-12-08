/** @format */

import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  getALlUsersSuccess,
  getAllUsersFailure,
  getSingleUserSuccess,
} from "redux/actions/Users";
import { GET_ALL_USERS_REQUEST,  GET_SINGLE_USER_REQUEST,  GET_SINGLE_USER_SUCCESS } from "redux/constants/Users";
import UsersService from "services/UsersService";

export function* getUsers() {
  yield takeEvery(GET_ALL_USERS_REQUEST, function* ({ payload }) {
    try {
      const user = yield call(UsersService.getAllUsers);
      if (user.length > 0) {
        yield put(getALlUsersSuccess(user));
      }
    } catch (err) {
      yield put(getAllUsersFailure(err.message));
    }
  });
}
export function* getSingleUserSaga() {
  yield takeEvery(GET_SINGLE_USER_REQUEST, function* ({ payload }) {
    try {
      const user = yield call(UsersService.getSingleUser, payload);
      if (user) {
        yield put(getSingleUserSuccess(user));
      }
    } catch (err) {
      console.error("Error", err);
      yield put(getAllUsersFailure(err.message));
    }
  });
}



export default function* rootSaga() {
  yield all([fork(getUsers), fork(getSingleUserSaga)]);
}
