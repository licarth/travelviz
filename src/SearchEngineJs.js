import { React } from "react";
import { connect } from 'react-redux'
import _ from 'lodash'
import { search } from "./actions";
import Rx from "rxjs";

class SearchEngine {

  constructor(reduxStore) {
    this.reduxStore = reduxStore;
    Rx.Observable.from(reduxStore)
      .do(state => this.onNextState(state))
      .subscribe();
  }

  dispatch(action) {
    this.reduxStore.dispatch(action);
  }

  onNextState(state) {
    // if 
  }

}

export default SearchEngine
