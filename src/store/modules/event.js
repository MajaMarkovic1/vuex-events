import EventService from '@/services/EventService.js'

export const namespaced = true
export const state = {
  events: [],
  totalEvents: {},
  event: {}
}
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_TOTAL_EVENTS(state, totalEvents) {
    state.totalEvents = totalEvents
  },
  GET_EVENT(state, event) {
    state.event = event
  }
}
export const actions = {
  createEvent({ commit, rootState }, event) {
    console.log('This is root state: ' + rootState.user.user.name)
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
    })
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  fetchEvent({ commit, getters }, id) {
    let event = getters.getEventById(id)
    if (event) {
      commit('GET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('GET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  }
}
