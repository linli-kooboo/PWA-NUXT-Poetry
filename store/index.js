import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { fetchPoetry } from '../api/fetchPoetry'

const store = () =>
  new Vuex.Store({
    state: {
      poetry: {}
    },
    actions: {
      fetchPoetry({ commit }) {
        return fetchPoetry()
          .then(res => {
            commit('setPoetry', { res })
          })
          .catch(() => {
            caches && caches.match(url).then(function(res) {
              if (res) {
                res.json().then(function updateFromCache(json) {
                  var data = json.data.result
                  commit('setPoetry', { data })
                })
              }
            })
          })
      }
    },
    mutations: {
      setPoetry(state, { res }) {
        state.poetry = {
          title: res.title,
          content: res.content.split('|').join('<br/>')
        }
      }
    }
  })

export default store
