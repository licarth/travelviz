import React from 'react';
import './Timeviz.css'
import moment from 'moment';
import _ from 'lodash';
import Dimensions from 'react-dimensions'
import Radium from 'radium';
import { timevizZoom } from './actions';
import InnerTimeviz from './InnerTimeviz'

const departFromPosition = 0.1;
const arriveByPosition = 0.9;

class Timeviz extends React.Component {
    constructor(props) {
        super(props);
        this.onWheel = this.onWheel.bind(this)
        this.state = {
            // cmPerHour: 1,
            pxPerHour: 100,
            // center: moment(),
            scrollLeft: 0,
        }
    }

    componentDidUpdate() {
        this.refs.c1.scrollLeft = this.state.scrollLeft;
    }

    componentDidMount() {
        this.refs.c1.scrollLeft = this.state.scrollLeft;
    }

    onWheel(deltaY, x) {
        const s2surS1 = (1 - deltaY * 0.001);
        const sl = this.state.scrollLeft;
        this.setState({
            // cmPerHour: this.state.cmPerHour * (1 - deltaY * 0.001),
            pxPerHour: this.state.pxPerHour * s2surS1,
                        // center: 
            // scrollLeft: this.state.scrollLeft - deltaY * x * 0.001,
            // scrollLeft: Math.max(0, this.state.scrollLeft - x * (1 - s2surS1))
            scrollLeft: (this.widthInPixels() > this.props.containerWidth) ? Math.max(0, (sl + x) * s2surS1 - x) : 0,
        })
        // console.log(this.state.scrollLeft)
        console.log(`scrollLeft=${this.state.scrollLeft}, x=${x}`)
    }

    widthInPixels() {
        return Math.max(this.state.pxPerHour * this.props.arriveBy.diff(this.props.departFrom, 'hour') / (arriveByPosition - departFromPosition), this.props.containerWidth);
    }

    render() {
        const {
            departFrom,
            arriveBy,
            searchAreas,
            searchAreaOrder,
            segments,
            onSegmentClick,
            containerHeight,
            containerWidth,
        } = this.props;

        console.log(containerHeight, containerWidth)

        // const width = `${this.state.cmPerHour * arriveBy.diff(departFrom, 'hour') / (arriveByPosition - departFromPosition)}cm`
        const width = `${this.widthInPixels()}px`

        return <div
            ref="c1"
            style={{
                overflowX: "overlay",
                height: "100%",
            }}
        >
            <div
                style={{
                    // overflowX: "overlay",
                    height: "100%",
                    width,
                }}
                className="timevizContainer">
                <InnerTimeviz
                    {..._.omit(this.props, ['containerHeight', 'containerWidth'])}
                    onWheel={this.onWheel}
                    width={this.state.cmPerHour}
                />
                {/* {React.createElement(Dimensions({
                    className: "innerTimevizDimensions"
                })(InnerTimeviz),
                    {
                        ...this.props,
                        onWheel: this.onWheel,
                    }, null)} */}
            </div>
        </div>
    }
}

Timeviz = Dimensions({
    className: "outerTimevizDimensions",
    containerStyle: {
        height: "100%",
        padding: 0,
        border: 0,
        overflowX: "overlay",
    },
    elementResize: true,
})(Timeviz)

export default Timeviz;
