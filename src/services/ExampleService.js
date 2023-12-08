import fetch from 'auth/FetchInterceptor'

const exampleService = {}

exampleService.getAllUsers = function (params) {
  return fetch({
    url: '/posts/1',
    method: 'get',
    params
  })
}

exampleService.setPost = function (data) {
  return fetch({
    url: '/posts',
    method: 'post',
    data: data
  })
}

export default exampleService