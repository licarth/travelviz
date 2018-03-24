import { combineReducers } from 'redux'
import _ from 'lodash'
import {
  SELECT_SEGMENT,
  ADD_SEGMENTS,
  SET_DEPARTURE,
  SET_ARRIVAL,
  CLICKED_LOCATION,
  LOCATION_INFORMATION,
  MOUSE_POSITION,
} from './actions'

function selectedSegmentIds(state = [], action) {
  switch (action.type) {
    case SELECT_SEGMENT:
      return _.union(state, [action.segmentId])
    default:
      return state
  }
}

function scheduledRequests(state = [], action) {
  switch (action.type) {
    case SELECT_SEGMENT:
      return _.union(state, [action.segmentId])
    default:
      return state
  }
}

function segments(state = [], action) {
  switch (action.type) {
    case ADD_SEGMENTS:
      return _.union(state, action.segments)
    default:
      return state
  }
}

function userInput(state = {}, action) {
  switch (action.type) {
    case CLICKED_LOCATION:
      switch (action.locationQualifier) {
        case "departure":
          return { ...state, departure: { latlng: action.latlng } }
        case "arrival":
          return { ...state, arrival: { latlng: action.latlng } }
        default:
          return state;
      }
    default:
      return state
  }
}

function locationInformation(state = {}, action) {
  switch (action.type) {
    case LOCATION_INFORMATION:
      switch (action.locationQualifier) {
        case "departure":
          return { ...state, departure: { latlng: action.latlng, name: action.name } }
        case "arrival":
          return { ...state, arrival: { latlng: action.latlng, name: action.name} }
        default:
          return state;
      }
    default:
      return state
  }
}

function mousePosition(state = {}, action) {
  if (action.type === MOUSE_POSITION){
    return action.latlng
  } else return state;
}

const app = combineReducers({
  selectedSegmentIds,
  scheduledRequests,
  segments,
  userInput,
  locationInformation,
  mousePosition,
})

export default app
