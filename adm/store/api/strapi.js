import Axios from 'axios'

console.log('process.env.REACT_APP_STRXLA_API_URL', process.env.REACT_APP_STRXLA_API_URL);
const axios = Axios.create({
  baseURL: process.env.REACT_APP_STRXLA_API_URL
})
axios.interceptors.response.use(res => res.data, e => Promise.reject(e));

export const loadContentCategories = async (q = {}) => {
  return await axios.get('/categories', { params: { _limit: 10 } })
}

export const loadContentArticles = async (q = {}, skip = 0, limit = 6) => {
  q._limit = limit
  q._start = skip
  q._publicationState = 'live'
  q._sort = 'createdAt:desc'
  q.status = 'published'
  return await Promise.all([
    axios.get('/articles', { params: q }),
    axios.get('/articles/count', { params: q })
  ])
}

export const loadContentArticle = async (slug) => {
  return await axios.get('/articles/' + slug)
}

export const loadContentComments = async (q = {}) => {
  return await axios.get('/comments', {params: q})
}
