import React, { Component } from 'react';
import './App.css';
import Timeviz from './Timeviz';
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

class App extends Component {
  render() {

    const departFrom = moment('2018-03-17T07:00:00');
    const arriveBy = moment('2018-03-17T19:30:00');

    const tripsMapping = (json) => _.map(json.trips,
      ({ departure_date, duration }) => {
        const departureMoment = moment(departure_date, "DD/MM/YYYY HH:mm:ss");
        return {
          departureMoment,
          arrivalMoment: departureMoment.clone().add(duration.value, duration.unity),
        };
      });

    return (
      <div className="App">
        <Timeviz
          departFrom={departFrom}
          arriveBy={arriveBy}
          clusters={[
            { name: "L'Alpe d'Huez" },
            { name: "Bourg d'Oisans" },
            { name: "Grenoble" },
            { name: "Lyon" },
            { name: "LYS" },
          ]}
          tripGroups={
            [
              {
                trips: tripsMapping(t01),
                departureCluster: 0,
                arrivalCluster: 1,
              },
              {
                trips: tripsMapping(t02),
                departureCluster: 0,
                arrivalCluster: 2,
              },
              {
                trips: tripsMapping(t03),
                departureCluster: 0,
                arrivalCluster: 3,
              },
              {
                trips: tripsMapping(t04),
                departureCluster: 0,
                arrivalCluster: 4,
              },
              {
                trips: tripsMapping(t23),
                departureCluster: 2,
                arrivalCluster: 3,
              },
              {
                trips: tripsMapping(t13),
                departureCluster: 1,
                arrivalCluster: 3,
              },
            ]
          }
        />
      </div>
    );
  }
}

export default App;
