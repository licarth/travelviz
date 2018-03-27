import { blablacar } from "./Queriers";
import Rx from "rxjs/Observable";
import { invertGeoCode } from "./InvertedGeoCoding";
import uuidv4 from 'uuid/v4';

/*
 * action types
 */

/**
 * Hovers over a trpi
 */
export const SELECT_SEGMENT = 'SELECT_SEGMENT'
export const ADD_SEGMENTS = 'ADD_SEGMENTS'
export const START_SEARCH = 'START_SEARCH'
export const END_SEARCH = 'END_SEARCH'
export const ADD_SEARCH_AREA = 'ADD_AREA'
export const AREA_INFORMATION = 'AREA_INFORMATION'
export const MOUSE_POSITION = 'MOUSE_POSITION'
export const MOUSE_OVER_SEGMENT = 'MOUSE_OVER_SEGMENT'
export const MOUSE_OUT_SEGMENT = 'MOUSE_OUT_SEGMENT'

export const TIMEVIZ_ZOOM = 'TIMEVIZ_ZOOM'

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

export function searchResults(id, optionsHash, segments) {
    return {
        type: ADD_SEGMENTS,
        id,
        optionsHash,
        segments,
    }
}

export function addSearchArea(latlng, radius, positionInList) {
    return function (dispatch, getState) {
        const id = uuidv4();
        dispatch(getAreaName(id, latlng))
        dispatch({
            type: ADD_SEARCH_AREA,
            id,
            latlng,
            positionInList,
        })
    }
}

export function areaInformation(id, name, latlng) {
    return {
        type: AREA_INFORMATION,
        id,
        name,
        latlng,
    }
}

export function timevizZoom(delta, y) {
    return {
        type: TIMEVIZ_ZOOM,
        delta,
        y,
    }
}

export function mousePosition(latlng) {
    return {
        type: MOUSE_POSITION,
        latlng,
    }
}

function startSearch(id, optionsHash, options) {
    return {
        type: START_SEARCH,
        id,
        optionsHash,
        options,
    }
}

export function search(optionsHash, options) {
    return function (dispatch) {
        const id = uuidv4();
        dispatch(startSearch(id, optionsHash, options))
        return blablacar(options)
            .then(segments => {
                dispatch(searchResults(id, optionsHash, segments))
                dispatch({ type: END_SEARCH, optionsHash })
            })
    }
}

export function getAreaName(id, latlng) {
    return function (dispatch) {
        return invertGeoCode(latlng)
            .then(name => dispatch(areaInformation(
                id,
                name,
                latlng
            )))
    }
}
