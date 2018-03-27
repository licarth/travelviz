import { connect } from 'react-redux'
import { clickSegment } from '../actions'
import Timeviz from '../Timeviz.js'

const mapStateToProps = state => {
  return {
    selectedSegments: state.selectedSegments,
    segments: state.segments,
    searches: state.searches,
    searchAreas: state.searchAreas,
    searchAreaOrder: state.searchAreaOrder,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSegmentClick: segmentId => {
      dispatch(clickSegment(segmentId))
    }
  }
}

const VisibleTimeviz = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeviz)

export default VisibleTimeviz
