import React, { Component } from 'react';
import { connect } from 'react-redux';

class Floor extends Component {
  constructor(props) {
    super(props);
  }

  loadFloors = () => {
    const beerLocations = this.props.beerLocations.filter(
      beerLocation => beerLocation.floor.building_id === this.props.building.id
    );

    return beerLocations.map(beerLocation => (
      <li className="white">
        <div className="x inline-block mb025">
          <div className="circle border fll mr1 mt05 ac w30">
            {beerLocation.floor.number}
          </div>
          <h4
            className="pointer"
            onClick={event =>
              this.props.toggleForm(
                event,
                beerLocation.id,
                beerLocation.keg.id,
                beerLocation.floor.id
              )
            }
          >
            {beerLocation.keg.name}
          </h4>
        </div>
        <p className="mt0">
          Style: {beerLocation.keg.style} | Calories:{' '}
          {beerLocation.keg.calories} | ABV: {beerLocation.keg.abv}%{' '}
        </p>
      </li>
    ));
  };

  render() {
    return <React.Fragment>{this.loadFloors()}</React.Fragment>;
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
    },
    changeKeg: beerLocationsData => {
      dispatch({ type: 'CHANGE_KEG', payload: beerLocationsData });
    }
  };
}

export default connect(
  msp,
  mdp
)(Floor);
