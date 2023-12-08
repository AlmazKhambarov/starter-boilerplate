/** @format */

import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  DELETE_USER,
  GET_SINGLE_USER,
  GET_SINGLE_USER_REQUEST,
  GET_SINGLE_USER_SUCCESS,
  UPDATE_USER,
} from "../constants/Users";

const initState = {
  usersData: [],
  loading: false,
  error: "",
  user: null,
};

const users = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        usersData: action.payload,
      };
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        posts: [],
        error: action.payload,
      };
    case GET_SINGLE_USER_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_USER:
      const {
        Id,
        name,
        username,
        email,
        street,
        phoneNumber,
        postcode,
        website,
        city,
        dateOfBirth,
      } = action.payload;

      // Map over the usersData array and update the user with the matching Id
      const updatedUserList = state.usersData.map((user) => {
        if (user.id == Id) {
          // Update the user properties
          return {
            ...user,
            name,
            username,
            email,
            address: {
              zipcode: postcode,
              city,
              street: street,
            },
            phoneNumber,

            website,

            dateOfBirth,
          };
        } else {
          // If the user Id doesn't match, return the original user
          return user;
        }
      });
      console.log(updatedUserList);
      return {
        ...state,
        loading: false,
        usersData: updatedUserList,
      };
    case DELETE_USER:
      const userIdToDelete = action.payload;
      const updatedUsersData = state.usersData.filter(
        (user) => user.id !== userIdToDelete
      );
      return {
        ...state,
        usersData: updatedUsersData,
      };

    default:
      return state;
  }
};

export default users;
