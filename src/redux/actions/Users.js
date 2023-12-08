import { DELETE_USER, GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS,  GET_SINGLE_USER_REQUEST, GET_SINGLE_USER_SUCCESS, UPDATE_USER } from "redux/constants/Users"

export const getALlUsersRequest = ()=>{
    return {
        type:GET_ALL_USERS_REQUEST
    }
}
export const getALlUsersSuccess =(payload)=>{
    return {
        type:GET_ALL_USERS_SUCCESS,
        payload
    }
}

export const getAllUsersFailure = (payload)=>{
    return{
        type:GET_ALL_USERS_FAILURE,
        payload
    }
}
export const getSingleUserReques = (payload)=>{
    return{
        type:GET_SINGLE_USER_REQUEST,
        payload:payload
    }
}
export const getSingleUserSuccess = (payload)=>{
    return{
        type:GET_SINGLE_USER_SUCCESS,
        payload
    }
}
export const updateUser = (payload) =>{
    console.log(payload)
    return{
        type:UPDATE_USER,
        payload
    }
}
export const deleteUser = (userId)=>{
    return{
        type:DELETE_USER,
        payload:userId
    }
}