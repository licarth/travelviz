import React from 'react';
import './Timeviz.css'
import moment from 'moment';
import _ from 'lodash';
import Dimensions from 'react-dimensions'
import Radium from 'radium';


const departFromPosition = 0;
const arriveByPosition = 1;

const LineContainer = Radium(({ containerHeight, containerWidth, widthInPercent, heightInPercent }) => {
    const width = 0.01 * widthInPercent * containerWidth;
    const height = 0.01 * heightInPercent * containerHeight;

    // const scale = containerWidth / 1000;
    // const scale = width * 0.03;
    const scale = 2;

    return <div className="line">
        <svg
            viewBox={`0 0 ${width} ${height}`}
            // preserveAspectRatio="none"
        >
            <line x1="0" y1="0"
                x2={width}
                y2={height}
                stroke="black"
                strokeLinecap="round"
                strokeWidth={2 * scale}
                style={{
                    ':hover': {
                        strokeWidth: 4 * scale
                    },
                }}
            />
            <circle
                key="2"
                cx={0} cy={0}
                r={4 * scale}
                stroke="black"
                // strokeWidth={1 * scale}
                fill="red"
                style={{
                    // ':hover': {
                    // strokeWidth: 1 * scale
                    // },
                }}
            />
            <circle cx={width} cy={height}
                key=""
                r={4 * scale}
                stroke="black"
                // strokeWidth={1 * scale}
                fill="red"
                style={{
                    // ':hover': {
                    // strokeWidth: 1 * scale
                    // },
                }}
            />
        </svg>
    </div >
});

const InnerTimeviz = ({ departFrom, arriveBy, tripGroups, clusters, containerWidth, containerHeight }) => {
    const a = (departFromPosition - arriveByPosition) /
        (departFrom.diff(arriveBy, 'seconds'))

    //Moment of x=0
    const mRef = departFrom.clone().add(-departFromPosition / a, 'seconds')

    const xPercentforMoment = (moment) => {
        return a * moment.diff(mRef, 'seconds') * 100;
    }

    const momentForXPercent = (x) => {
        return mRef.clone().add(x / a, 'seconds')
    }

    const Trip = ({ departureMoment, arrivalMoment, departureCluster, arrivalCluster, heightInPercent }) => {
        const left = xPercentforMoment(moment(departureMoment));
        const widthInPercent = xPercentforMoment(moment(arrivalMoment)) - left;
        const height = arrivalCluster - departureCluster;

        const childProps = {
            containerHeight: containerHeight * height,
            containerWidth,
            widthInPercent,
            heightInPercent,
        }

        return <div
            className="trip"
            style={{
                gridRowStart: 2 * (departureCluster + 1),
                gridRowEnd: 2 * (arrivalCluster + 1),
                left: `${left}%`,
                width: `${widthInPercent}%`,
            }}
        >
            <LineContainer {...childProps} />
        </div>
    }

    const TripGroup = ({ departureCluster, arrivalCluster, trips, heightInPercent }) => {
        return _.map(trips, (t) => {
            const childProps = {
                departureMoment: t.departureMoment,
                arrivalMoment: t.arrivalMoment,
                departureCluster,
                arrivalCluster,
                heightInPercent,
            }
            return <Trip {...childProps} />
        })
    }

    const HorizontalMarker = ({ text, m }) => {

        const markerHeightInVw = 20;

        return <div className="marker" style={{
            position: "absolute",
            top: `${containerHeight - markerHeightInVw / 2}px`,
            left: `${xPercentforMoment(m)}%`,
        }}>
            <div
                className="hMarker"
                style={{
                    height: `${markerHeightInVw}px`,
                    borderLeft: "solid green",
                    left: "-0.5px",
                }}><br></br></div>
            <div className="label">
                {m.format('LT')}
            </div>
        </div>
    }

    const lines = _.map(tripGroups, (tg) => {
        return <TripGroup {..._.pick(tg, [
            'trips',
            'departureCluster',
            'arrivalCluster',
        ]) }
            heightInPercent={100 / clusters.length}
        />
    })

    return <div className="timeviz">
        <div className="tripsContainer"
            style={{ gridTemplateRows: `repeat(${2 * clusters.length}, 1fr)` }}
        >
            {lines}
            {_.map(clusters, ({ name }, i) =>
                <div
                    className="clusterLabelContainer"
                    style={{
                        gridColumn: 1,
                        gridRowStart: 2 * i + 1,
                    }}>
                    <div className="clusterLabel">{name}</div></div>
            )}
        </div>
        <div className="timeline">
        </div>
        <HorizontalMarker text="Depart From" m={departFrom} />
        <HorizontalMarker text="Arrive By" m={arriveBy} />
    </div>
}


const Timeviz = (props) => {
    return <div className="timevizContainer">
        {React.createElement(Dimensions({
            className: "timevizDimensions"
        })(InnerTimeviz), props, null)}
    </div>
}
export default Timeviz;