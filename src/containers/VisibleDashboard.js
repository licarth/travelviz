import { connect } from 'react-redux'
import Dashboard from '../Dashboard'
import _ from "lodash";
import {
    START_SEARCH,
    search,
    getLocationName,
    onLocationClick,
    clickSegment,
    addSearchArea,
    mousePosition,
    clickedLocation
} from '../actions';

const mapStateToProps = state => {
    
    // let clickedLocation;
    // if (!state.departure) {
    //     clickedLocation = this.props.setDeparture;
    // } else if (!props.arrival) {
    //     clickedLocation = (latlng) => {
    //         this.props.setArrival(latlng);
    //         this.props.startSearch({
    //             departure: props.departure,
    //             arrival: { latlng },
    //         },
    //             "departure",
    //             "arrival",
    //         )
    //     }
    // } else {
    //     clickedLocation = (latlng) => {
    //         this.props.setIntermediate(latlng);
    //         this.props.startSearch({
    //             departure: props.departure,
    //             arrival: { latlng },
    //         },
    //             "departure",
    //             "intermediate", )
    //         this.props.startSearch({
    //             departure: { latlng },
    //             arrival: props.arrival,
    //         },
    //             "intermediate",
    //             "arrival",
    //         )
    //     }
    // } let clickedLocation;
    // if (!props.departure) {
    //     clickedLocation = this.props.setDeparture;
    // } else if (!props.arrival) {
    //     clickedLocation = (latlng) => {
    //         this.props.setArrival(latlng);
    //         this.props.startSearch({
    //             departure: props.departure,
    //             arrival: { latlng },
    //         },
    //             "departure",
    //             "arrival",
    //         )
    //     }
    // } else {
    //     clickedLocation = (latlng) => {
    //         this.props.setIntermediate(latlng);
    //         this.props.startSearch({
    //             departure: props.departure,
    //             arrival: { latlng },
    //         },
    //             "departure",
    //             "intermediate", )
    //         this.props.startSearch({
    //             departure: { latlng },
    //             arrival: props.arrival,
    //         },
    //             "intermediate",
    //             "arrival",
    //         )
    //     }
    // }

    // let tripGroups = [];

    // for (const startEnd in state.segments) {
    //   if (state.segments.hasOwnProperty(startEnd)) {
    //     const segments = state.segments[startEnd];
    //     tripGroups.push({
    //       trips: segments,
    //     })
    //   }
    // }

    // _.mapKeys(state.segments, (segments, startEnd) => {
    //   switch (startEnd) {
    //     case "departure-arrival":

    //   }
    //   // [{
    //   //   trips: state.segments,
    //   //   departureCluster: 0,
    //   //   arrivalCluster: 1,
    //   // }]
    // })

    return {
        segments: state.segments,
        searches: state.searches,
        searchAreas: state.searchAreas,
        searchAreaOrder: state.searchAreaOrder,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // startSearch: (options, startGroup, endGroup) => {
        //   dispatch(search(options, startGroup, endGroup))
        // },
        onLocationClick: (latlng, positionInList) => {
            // dispatch(getLocationName(latlng, position))
            dispatch(addSearchArea(latlng, positionInList))
        },
        // setArrival: (latlng) => {
        //   dispatch(getLocationName(latlng, "arrival"))
        //   dispatch(clickedLocation(latlng, "arrival"))
        // },
        onMouseMove: (latlng) => {
        //   dispatch(mousePosition(latlng))
        },
        // setIntermediate: (latlng) => {
        //   dispatch(getLocationName(latlng, "intermediate"))
        //   dispatch(onLocationClick(latlng, "intermediate"))
        // }
    }
}

const VisibleDashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)

export default VisibleDashboard

