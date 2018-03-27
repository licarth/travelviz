import { React } from "react";
import { connect } from 'react-redux'
import _ from 'lodash'
import { search } from "./actions";
import Rx from "rxjs";
import hash from 'object-hash'
import { Set } from 'immutable'

const SearchEngine = ({
  searches,
  searchAreaOrder,
  doSearch,
  searchAreas,
}) => {

  let searchesToBeDone = [];

  if (searchAreaOrder.length == 2) {
    searchesToBeDone.push(
      {
        departureAreaId: searchAreaOrder[0],
        arrivalAreaId: searchAreaOrder[1],
      }
    )
  } else if (searchAreaOrder.length == 3) {
    searchesToBeDone.push(
      {
        departureAreaId: searchAreaOrder[0],
        arrivalAreaId: searchAreaOrder[1],
      },
      {
        departureAreaId: searchAreaOrder[1],
        arrivalAreaId: searchAreaOrder[2],
      }
    )
  }

  _.map(searchesToBeDone, (options) => {
    const optionsHash = hash(options);
    if (!searches.inprogress.has(optionsHash) && !searches.done.has(optionsHash)) {
      doSearch(optionsHash, {
        ...options,
        departureArea: searchAreas[options.departureAreaId],
        arrivalArea: searchAreas[options.arrivalAreaId],
      });
    }
  })

  return null;
}

const mapStateToProps = ({
  searches,
  searchAreas,
  searchAreaOrder,
}) => {
  return {
    searches,
    searchAreas,
    searchAreaOrder,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doSearch: (optionsHash, { departureArea, arrivalArea, departFrom, arriveBy }) => {
      dispatch(search(optionsHash, { departureArea, arrivalArea, departFrom, arriveBy }))
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (SearchEngine);
