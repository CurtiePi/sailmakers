import axios from 'axios'

export default () => {
  return { insecure: axios.create({
    baseURL: 'http://192.168.1.6:8860'
  }),

  secure: axios.create({
    baseURL: 'https://192.168.1.6:8993',
    withCredentials: true
  })
  }
}
