import fetch from 'auth/FetchInterceptor'

const UsersService = {}

UsersService.getAllUsers = function () {
  return fetch({
    url: '/users',
    method: 'get',
    // params
  })
}

UsersService.getSingleUser = function (payload) {
  return fetch({
    url: `/users/${payload}`,
    method: 'get',
  })
}

export default UsersService