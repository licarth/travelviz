import React, { Component } from 'react';
import moment from 'moment';
import VisibleTimeviz from './containers/VisibleTimeviz';
import _ from 'lodash'
import MapContainer from './Map'
import { blablacar } from "./Queriers";
import { connect } from 'react-redux'
import VisibleDashboard from './containers/VisibleDashboard';

const Dashboard = ({ searchAreas, searchAreaOrder, segments, onLocationClick, onMouseMove }) => {

    const now = moment();
    const props = this.props;

    let departFrom;
    let arriveBy;

    departFrom = _.defaultTo(_.get(_.minBy(_.values(segments), 'departureMoment'), 'departureMoment'), now)
    arriveBy = _.defaultTo(_.get(_.maxBy(_.values(segments), 'arrivalMoment'), 'arrivalMoment'), now.clone().add(2, 'days'))

    // arriveBy = _.min([arriveBy, departFrom.clone().add(2, 'days')])

    // let clusters = _.map(
    //     searchAreas,
    //     (string) => ({ name: string })
    // )

    return (
        <div className="App">
            <div className="map">
                <MapContainer
                    onLocationClick={onLocationClick}
                    onMouseMove={onMouseMove}
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
                    searchAreas={searchAreas}
                    searchAreaOrder={searchAreaOrder}
                    segments={segments}
                    // tripGroups={this.props.tripGroups}
                />
            </div>
        </div>
    );
}

export default Dashboard;
