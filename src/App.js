import React, { Component } from 'react';
import { connect } from 'react-redux';
import Building from './components/Building';
import Admin from './containers/Admin';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WeWorkDisplay from './components/WeWorkDisplay';

class App extends Component {
  componentDidMount() {
    fetch(this.props.url + '/api/v1/buildings')
      .then(r => r.json())
      .then(buildings => this.props.addBuildings(buildings))
      .catch(e => console.log(e));
    fetch(this.props.url + '/api/v1/kegs')
      .then(r => r.json())
      .then(kegs => this.props.addKegs(kegs))
      .catch(e => console.log(e));
    fetch(this.props.url + '/api/v1/beerlocations')
      .then(r => r.json())
      .then(beerLocations => this.props.addBeerLocations(beerLocations))
      .catch(e => console.log(e));
  }

  render() {
    if (!this.props.beerLocations.length) {
      return (
        <div className="fill fix f jcc aic">
          <p className="fa ac">Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="p1 mx1 mt1 border fill rel vh-4">
            <div className="f fw x aic">
              <h1 className="fll fa white al order-2" id="title">
                Beer List
              </h1>
              <img
                src="./wework-logo.svg"
                className="logo right fa"
                alt="logo"
              />
            </div>
            <hr className="mt05" />
            <Router>
              <React.Fragment>
                <Route exact path="/" component={() => <Building />} />
                <Route
                  exact
                  path="/wework"
                  component={() => <WeWorkDisplay />}
                />
                <Route exact path="/admin" component={() => <Admin />} />
              </React.Fragment>
            </Router>
          </div>
          <div className="x rel px1">
            <p className="white fll small my05 mr1">
              *Caloric and ABV values are estimates
            </p>
            <p className="white fll small my05 mr1">
              <span role="img" aria-label="broken-heart">
                💔
              </span>
              <a
                href="http://maxsmouha.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Max Smouha
              </a>
            </p>
            <p className="white fll small my05 under pointer">About</p>
          </div>
        </div>
      );
    }
  }
}

function msp(state) {
  return {
    buildings: state.buildings,
    floors: state.floors,
    kegs: state.kegs,
    beerLocations: state.beerLocations,
    url: state.url
  };
}

function mdp(dispatch) {
  return {
    addBuildings: buildingsData => {
      dispatch({ type: 'ADD_BUILDINGS', payload: buildingsData });
    },
    addFloors: floorsData => {
      dispatch({ type: 'ADD_FLOORS', payload: floorsData });
    },
    addKegs: kegsData => {
      dispatch({ type: 'ADD_KEGS', payload: kegsData });
    },
    addBeerLocations: beerLocationsData => {
      dispatch({ type: 'ADD_BEERLOCATIONS', payload: beerLocationsData });
    }
  };
}

export default connect(
  msp,
  mdp
)(App);
