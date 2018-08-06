import React, { Component } from 'react';
import { connect } from 'react-redux';

class Floor extends Component {
  constructor(props) {
    super(props);
  }

  loadFloors = () => {
    const floors = this.props.floors.filter(
      floor => this.props.building.id === floor.building_id
    );
    return floors.map(floor => {
      return floor.kegs.map(keg => {
        return (
          <li className="white" data-floorid={floor.number}>
            <div className="x inline-block mb025">
              <div className="circle border fll mr1 mt05 ac w30">
                {floor.number}
              </div>
              <h4
                data-beerid={keg.id}
                className="pointer"
                onClick={event => this.props.toggleForm(event, keg.id)}
              >
                {keg.name}
              </h4>
            </div>
            <p className="mt0">
              Style: {keg.style} | Calories: {keg.calories} | ABV: {keg.abv}%{' '}
            </p>
          </li>
        );
      });
    });
  };

  render() {
    console.log('render', this.props);
    return <React.Fragment>{this.loadFloors()}</React.Fragment>;
  }
}

function msp(state) {
  return {
    buildings: state.buildings,
    floors: state.floors,
    kegs: state.kegs,
    beerLocations: state.beerLocations
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
)(Floor);
