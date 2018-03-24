import React, { Component } from 'react';
import './App.css';
import VisibleTimeviz from './containers/VisibleTimeviz';
import moment from 'moment';
import t23 from './bbc/23.json'
import t13 from './bbc/13.json'
import t01 from './bbc/01.json'
import t02 from './bbc/02.json'
import t03 from './bbc/03.json'
import t04 from './bbc/04.json'
import bourgGrenoble from './bbc.json'
import bourgLyon from './bbc.json'
import _ from 'lodash'
import MapContainer from './Map'
import { blablacar } from "./Queriers";
import { connect } from 'react-redux'
import { START_SEARCH, search, getLocationName, clickedLocation } from './actions';

class App extends Component {

  render() {
    const props = this.props;
    // if (props.departure && props.arrival && _.isEmpty(props.tripGroups[0].trips)) {
    //   this.props.startSearch({
    //     departure: props.departure,
    //     arrival: props.arrival,
    //   })
    // }
    const departFrom = moment();
    const arriveBy = departFrom.clone().add(10, 'hours');

    let onNextClick;
    if (!props.departure) {
      onNextClick = this.props.setDeparture;
    } else if (!props.arrival) {
      onNextClick = (latlng) => {
        this.props.setArrival(latlng);
        this.props.startSearch({
          departure: props.departure,
          arrival: { latlng },
        })
      }
    }

    const clusters = _.map(
      _.compact([props.departureName, props.arrivalName]),
      (string) => ({ name: string })
    )
    console.log(clusters);
    return (
      <div className="App">
        <div className="map">
          <MapContainer
            onNextClick={onNextClick}
          />
        </div>
        <div
          style={{
            overflowX: "overlay",
          }}
        >
          <VisibleTimeviz
            departFrom={departFrom}
            arriveBy={arriveBy}
            clusters={clusters}
            tripGroups={this.props.tripGroups}
          // tripGroups={
          //   [
          //     {
          //       trips: tripsMapping(t01),
          //       departureCluster: 0,
          //       arrivalCluster: 1,
          //     },
          //     {
          //       trips: tripsMapping(t02),
          //       departureCluster: 0,
          //       arrivalCluster: 2,
          //     },
          //     {
          //       trips: tripsMapping(t03),
          //       departureCluster: 0,
          //       arrivalCluster: 3,
          //     },
          //     {
          //       trips: tripsMapping(t04),
          //       departureCluster: 0,
          //       arrivalCluster: 4,
          //     },
          //     {
          //       trips: tripsMapping(t23),
          //       departureCluster: 2,
          //       arrivalCluster: 3,
          //     },
          //     {
          //       trips: tripsMapping(t13),
          //       departureCluster: 1,
          //       arrivalCluster: 3,
          //     },
          //   ]
          // }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    departure: state.userInput.departure,
    arrival: state.userInput.arrival,
    departureName: _.get(state, 'locationInformation.departure.name'),
    arrivalName: _.get(state, 'locationInformation.arrival.name'),
    tripGroups: [{
      trips: state.segments,
      departureCluster: 0,
      arrivalCluster: 1,
    }],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startSearch: (opts) => {
      dispatch(search(opts))
    },
    setDeparture: (latlng) => {
      dispatch(getLocationName(latlng, "departure"))
      dispatch(clickedLocation(latlng, "departure"))
    },
    setArrival: (latlng) => {
      dispatch(getLocationName(latlng, "arrival"))
      dispatch(clickedLocation(latlng, "arrival"))
    },
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default App;
