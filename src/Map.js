/* eslint-disable no-undef */
import React from "react"
import _ from "lodash"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"
import { dispatch, connect } from 'react-redux'
import { clickedLocation } from "./actions";

const key = 'AIzaSyBDVXClEZonIcG76-_kVfhzApvP87vFnYw';

const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const mapStateToProps = state => {
    console.log(state.mousePosition);
    let newState;
    // if (state.userInput.departure) {
    //     newState
    // }
    return {
        ...state.userInput,
        mousePosition: state.mousePosition,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onClick: (event) => {
        //     dispatch(
        // clickedLocation({
        //     lat: event.latLng.lat(),
        //     lng: event.latLng.lng(),
        // }))
        // }
    }
}

class MyMap extends React.Component {


    render() {
        const props = this.props;

        let onClick;
        if (!props.arrival) {
            onClick = (e) => props.onNextClick({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            })
        }

        let onMouseMove

        if (!props.arrival) {
            onMouseMove = (e) => {
                props.onMouseMove({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                })
            }
        }

        let circles = [];

        if (!props.departure) {
            circles.push(
                <Circle
                    center={props.mousePosition}
                    radius={10000}
                    onClick={onClick}
                    options={{
                        fillColor: '#a7f442',
                        fillOpacity: 0.35,
                        strokeColor: '#a7f442',
                        strokeOpacity: 0.8,
                    }}
                    onMouseMove={(e) => {
                        props.onMouseMove({
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng(),
                        })
                    }}
                />
            )
        } else {
            circles.push(<Circle
                center={props.departure.latlng}
                radius={10000}
                onClick={onClick}
                options={{
                    fillColor: '#a7f442',
                    fillOpacity: 0.35,
                    strokeColor: '#a7f442',
                    strokeOpacity: 0.8,
                }}
            />)
            if (!props.arrival) {
                circles.push(<Circle
                    center={props.mousePosition}
                    radius={10000}
                    onClick={onClick}
                    options={{
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                    }}
                    onMouseMove={(e) => {
                        props.onMouseMove({
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng(),
                        })
                    }}
                />)
            } else {
                circles.push(<Circle
                    center={props.arrival.latlng}
                    radius={10000}
                    onClick={onClick}
                    options={{
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                    }}
                />)
            }
        }

        return <GoogleMap
            defaultZoom={8}
            ref={props.onMapMounted}
            onClick={onClick}
            onMouseMove={onMouseMove}
            center={props.center}
            defaultOptions={{
                styles: [
                    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                    {
                        featureType: 'administrative.locality',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#d59563' }]
                    },
                    {
                        featureType: 'poi',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#d59563' }]
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'geometry',
                        stylers: [{ color: '#263c3f' }]
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#6b9a76' }]
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry',
                        stylers: [{ color: '#38414e' }]
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry.stroke',
                        stylers: [{ color: '#212a37' }]
                    },
                    {
                        featureType: 'road',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#9ca5b3' }]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry',
                        stylers: [{ color: '#746855' }]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry.stroke',
                        stylers: [{ color: '#1f2835' }]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#f3d19c' }]
                    },
                    {
                        featureType: 'transit',
                        elementType: 'geometry',
                        stylers: [{ color: '#2f3948' }]
                    },
                    {
                        featureType: 'transit.station',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#d59563' }]
                    },
                    {
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [{ color: '#17263c' }]
                    },
                    {
                        featureType: 'water',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#515c6d' }]
                    },
                    {
                        featureType: 'water',
                        elementType: 'labels.text.stroke',
                        stylers: [{ color: '#17263c' }]
                    }
                ]
            }}>
            <SearchBox ref={props.onSearchBoxMounted} bounds={props.bounds} controlPosition={google.maps.ControlPosition.TOP_LEFT} onPlacesChanged={props.onPlacesChanged}>
                <input type="text"
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        marginTop: `27px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                    }} />
            </SearchBox>

            {circles}
        </GoogleMap>
    }
}

let MapContainer = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${key}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div
            style={{
                height: `100%`
            }}
        />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}
            this.setState({
                bounds: null,
                center: {
                    lat: 48.859226,
                    lng: 2.346709,
                },
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    // refs.map.fitBounds(bounds);
                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
)(MyMap)

export default MapContainer;