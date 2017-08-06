import Axios from '../libs/axios'
const loginUrl = 'http://localhost:8082/'

export const Login = (func) => {
  Axios.get(loginUrl).then(function (result) {
    if (result.data.ret === 200) {
      func(result)
    }
  })
}
export const test = (func) => {
  Axios.get(loginUrl).then(function (result) {
    func(result)
  })
}
