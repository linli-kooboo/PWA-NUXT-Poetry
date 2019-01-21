import axios from 'axios'

export function fetchPoetry() {
  return axios
    .get('https://api.apiopen.top/recommendPoetry')
    .then(res => res.data.result)
}
