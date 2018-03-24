import React from 'react';
import './Timeviz.css'
import moment from 'moment';
import _ from 'lodash';
import Dimensions from 'react-dimensions'
import Radium from 'radium';

const departFromPosition = 0.1;
const arriveByPosition = 0.9;
const cmPerHour = 1;

const InnerTimeviz = ({
    departFrom,
    arriveBy,
    tripGroups,
    clusters,
    onSegmentClick,
    containerWidth,
    containerHeight,
}) => {
    const labelHeight = containerHeight * 0.05;
    const a = (departFromPosition - arriveByPosition) /
        (departFrom.diff(arriveBy, 'seconds'))

    //Moment of x=0
    const mRef = departFrom.clone().add(-departFromPosition / a, 'seconds')

    const xPercentforMoment = (moment) => {
        return a * moment.diff(mRef, 'seconds');
    }

    const momentForXPercent = (x) => {
        return mRef.clone().add(x / a, 'seconds')
    }

    const Trip = Radium(({
        departureMoment,
        arrivalMoment,
        departureCluster,
        arrivalCluster,
    }) => {
        const leftInpercent = xPercentforMoment(moment(departureMoment));
        const widthInPercent = xPercentforMoment(moment(arrivalMoment)) - leftInpercent;
        const height = arrivalCluster - departureCluster;

        const childProps = {
            containerHeight: containerHeight * height,
            containerWidth,
            widthInPercent,
        }

        const dep = {
            x: leftInpercent * containerWidth,
            y: labelHeight / 2 + departureCluster / clusters.length * containerHeight
        }

        const arr = {
            x: (leftInpercent + widthInPercent) * containerWidth,
            y: labelHeight / 2 + arrivalCluster / clusters.length * containerHeight,
        }

        const strokeColor = "rgb(206, 175, 0)";

        return <g
        // style={{
        //     ':hover': {
        //         opacity: 1,
        //         stroke: 'red',
        //     },
        // }}over': {
        //         opacity: 1,
        //         stroke: 'red',
        //     },
        // }}
        >
            <circle cx={dep.x} cy={dep.y} r={10} />
            <circle cx={arr.x} cy={arr.y} r={10} />
            <line
                x1={dep.x}
                y1={dep.y}

                x2={arr.x}
                y2={arr.y}
                stroke={strokeColor}
                strokeLinecap="round"
                strokeWidth={10}
                opacity={0.6}
                onClick={e => {
                    // e.preventDefault();
                    onSegmentClick("segment1")
                }}
                style={{
                    ':hover': {
                        opacity: 1,
                        stroke: 'red',
                    },
                }}
            />
        </g>
    })

    const TripGroup = ({ departureCluster, arrivalCluster, trips }) => {
        return _.map(trips, (t) => {
            const childProps = {
                departureMoment: t.departureMoment,
                arrivalMoment: t.arrivalMoment,
                departureCluster,
                arrivalCluster,
            }
            return <Trip {...childProps} />
        })
    }


    const lines = _.map(tripGroups, (tg) => {
        return <TripGroup {..._.pick(tg, [
            'trips',
            'departureCluster',
            'arrivalCluster',
        ])}
        />
    })

    const markerHeightInVw = 20;

    const HorizontalMarker = ({ text, m }) => {

        return <div className="marker" style={{
            position: "absolute",
            top: `${- markerHeightInVw / 2}px`,
            // top: `0`,
            left: `${xPercentforMoment(m) * 100}%`,
        }}>
            <div
                className="hMarker"
                style={{
                    borderLeft: "solid green",
                    height: markerHeightInVw,
                    left: "-0.5px",
                }}><br></br></div>
            <div className="label">
                {m.format('LT')}<br></br>{text}
            </div>
        </div>
    }

    return <div className="timeviz"
        style={{
        }}
    >
        <div className="tripsContainer"
            style={{
                gridTemplateRows: `repeat(${clusters.length}, 1fr)`,
            }}
        >
            <svg
                viewBox={`0 0 ${containerWidth} ${containerHeight}`}
                preserveAspectRatio="none"
            >
                {lines}
            </svg>
            {_.map(clusters, ({ name }, i) =>
                <div
                    className="clusterLabelContainer"
                    style={{
                        height: labelHeight,
                        gridColumn: 1,
                        gridRowStart: i + 1,
                    }}>
                    <div className="clusterLabel">{name}</div>
                </div>
            )}
        </div>
        <div className="timeline">
            <div style={{
                position: "relative",
            }}>
                <div style={{
                    borderTop: "solid",
                }}></div>
                <HorizontalMarker text="Depart From" m={departFrom} />
                <HorizontalMarker text="Arrive By" m={arriveBy} />
            </div>
        </div>
    </div>
}


const Timeviz = (props) => {
    const {
        departFrom,
        arriveBy,
        clusters,
        tripGroups,
        onSegmentClick,
    } = props;
    const width = `${cmPerHour * arriveBy.diff(departFrom, 'hour') / (arriveByPosition - departFromPosition)}cm`

    return <div
        style={{
            // width,
        }}
        className="timevizContainer">
        {React.createElement(Dimensions({
            className: "timevizDimensions"
        })(InnerTimeviz), props, null)}
    </div>
}

export default Timeviz;