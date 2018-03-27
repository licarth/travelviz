import { combineReducers } from 'redux'
import _ from 'lodash'
import {
  SELECT_SEGMENT,
  ADD_SEGMENTS,
  SET_DEPARTURE,
  SET_ARRIVAL,
  ADD_SEARCH_AREA,
  AREA_INFORMATION,
  MOUSE_POSITION,
  START_SEARCH,
  END_SEARCH,
  TIMEVIZ_ZOOM,
} from './actions'
import { Set, Map } from 'immutable'


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

function segments(state = new Map(), a) {
  switch (a.type) {
    case ADD_SEGMENTS:
      return state.merge(_.keyBy(a.segments, 'id'))
    default:
      return state
  }
}

function searches(state = {
  inprogress: new Set(),
  done: new Set(),
  optionsBySearchId: new Map(),
  segmentIdsBySearchId: new Map(),
  searchIdsByAreaCouple: new Map(),
}, a) {
  switch (a.type) {
    case START_SEARCH: {
      const inprogress = state.inprogress.add(a.optionsHash)
      const options = state.optionsBySearchId.set(a.id, a.options)
      const key = `${a.options.departureArea.id}-${a.options.arrivalArea.id}`;
      const searchIdsByAreaCouple = (
        (state.searchIdsByAreaCouple.has(key))
          ? state.searchIdsByAreaCouple.set(key, state.searchIdsByAreaCouple.get(key).push(a.id))
          : state.searchIdsByAreaCouple.set(key, [a.id])
      )
      return _.merge({}, state, { inprogress, options, searchIdsByAreaCouple })
    }
    case END_SEARCH: {
      const inprogress = state.inprogress.delete(a.optionsHash)
      const done = state.done.add(a.optionsHash)
      return _.merge({}, state, { inprogress, done })
    }
    case ADD_SEGMENTS: {
      const segmentIdsBySearchId = state.segmentIdsBySearchId.set(a.id, _.map(a.segments, 'id'))
      return _.merge({}, state, { segmentIdsBySearchId })
    }
  }
  return state;
}

function searchAreaOrder(state = [], a) {
  switch (a.type) {
    case ADD_SEARCH_AREA:
      switch (state.length) {
        case 0:
          return [a.id]
        case 1:
          return [state[0], a.id]
        case 2:
          return [state[0], a.id, state[1]]
        default:
          // return [..._.initial(state), a.id, state[state.length - 1]]
          return [state[0], a.id, state[2]]
      }
    default:
      return state
  }
}

function searchAreas(state = {}, a) {
  switch (a.type) {
    case AREA_INFORMATION:
      return _.merge({}, state, { [a.id]: { name: a.name } });
    case ADD_SEARCH_AREA:
      return _.merge({}, state, {
        [a.id]: {
          id: a.id,
          radius: a.radius,
          latlng: a.latlng,
        }
      });
    default:
      return state;
  }
}

function mousePosition(state = {}, action) {
  if (action.type === MOUSE_POSITION) {
    return action.latlng
  } else return state;
}

const app = combineReducers({
  selectedSegmentIds,
  scheduledRequests,
  segments,
  searchAreaOrder,
  searchAreas,
  mousePosition,
  searches,
})

export default app
