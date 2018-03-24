import { blablacar } from "./Queriers";
import Rx from "rxjs/Observable";
import { invertGeoCode } from "./InvertedGeoCoding";

/*
 * action types
 */

/**
 * Hovers over a trpi
 */
export const SELECT_SEGMENT = 'SELECT_SEGMENT'
export const ADD_SEGMENTS = 'ADD_SEGMENTS'
export const START_SEARCH = 'START_SEARCH'
export const CLICKED_LOCATION = 'CLICKED_LOCATION'
export const LOCATION_INFORMATION = 'LOCATION_INFORMATION'
export const MOUSE_POSITION = 'MOUSE_POSITION'
export const MOUSE_OVER_SEGMENT = 'MOUSE_OVER_SEGMENT'
export const MOUSE_OUT_SEGMENT = 'MOUSE_OUT_SEGMENT'

// export const SET_DEPARTURE = 'SET_DEPARTURE'

/*
 * action creators
 */

export function clickSegment(segmentId, segment) {
    return {
        type: SELECT_SEGMENT,
        segmentId,
    }
}

export function searchResults(segments) {
    return {
        type: ADD_SEGMENTS,
        segments,
    }
}

export function clickedLocation(latlng, locationQualifier) {
    return {
        type: CLICKED_LOCATION,
        latlng,
        locationQualifier,
    }
}

export function locationInformation({ locationQualifier, name, latlng }) {
    return {
        type: LOCATION_INFORMATION,
        locationQualifier,
        name,
        latlng,
    }
}

export function mousePosition(latlng) {
    return {
        type: MOUSE_POSITION,
        latlng,
    }
}

// export function mouseOverSegment() {
//     return {
//         type: MOUSE_OVER_SEGMENT,
//         latlng,
//     }
// }

function startSearch({ departFrom, arriveBy, departure, arrival }) {
    return {
        type: START_SEARCH,
        departFrom,
        arriveBy,
        departure,
        arrival,
    }
}

export function search(opts) {
    return function (dispatch) {
        dispatch(startSearch(opts))
        getLocationName(opts)
        getLocationName(opts)
        return blablacar(opts)
            .then(segments => dispatch(searchResults(segments)))
    }
}

export function getLocationName(latlng, locationQualifier) {
    return function (dispatch) {
        return invertGeoCode(latlng)
            .then(name => dispatch(locationInformation({
                locationQualifier,
                name,
                latlng
            })))
    }
}
