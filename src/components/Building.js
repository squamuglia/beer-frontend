import React, { Component } from 'react';
import { connect } from 'react-redux';
import Floor from './Floor';
import UpdateBeerForm from './UpdateBeerForm';
import UUID from 'uuid';

class Building extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formOpen: false,
      beerSelect: null,
      floorSelect: null,
      beerLocation: null,
      keg: null
    };
  }

  objectIdComparator = (array, object) =>
    !array.map(item => item.id === object.id).includes(true);

  changeKeg = (e, kegSelect) => {
    e.preventDefault();
    fetch(this.props.url + '/api/v1/beerlocations/' + this.state.beerLocation, {
      method: 'POST',
      body: JSON.stringify({
        keg_id: kegSelect,
        floor_id: this.state.floorSelect
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(beerLocation => this.props.changeBeerLocation(beerLocation));

    this.setState({
      ...this.state,
      formOpen: !this.state.formOpen
    });
  };

  formDisplay = () => {
    if (this.state.formOpen === true) {
      let kegSelect = '';

      return (
        <UpdateBeerForm
          toggleForm={this.toggleForm}
          keg={kegSelect}
          kegs={this.props.kegs}
          floor={this.state.floorSelect}
          changeKeg={this.changeKeg}
        />
      );
    }
  };

  loadFloors = () => {
    return this.props.buildings.map(building => {
      return (
        <div className="fa" data-buildingid={building.id} id={UUID()}>
          <h3 className="white mt1 mb05 mr05 pb05 border-bottom">
            {building.street}
          </h3>
          <ul id={UUID()}>
            <Floor building={building} toggleForm={this.toggleForm} />
          </ul>
        </div>
      );
    });
  };

  toggleForm = (event, id, keg, floor) => {
    this.setState(
      Object.assign({}, this.state, {
        formOpen: !this.state.formOpen,
        keg: id,
        beerSelect: keg,
        beerLocation: id,
        floorSelect: floor
      }),
      () => console.log('toggleForm', this.state)
    );
  };

  render() {
    console.log('building props', this.props);

    return (
      <React.Fragment>
        {this.formDisplay()}
        {this.loadFloors()}
      </React.Fragment>
    );
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
    changeBeerLocation: beerLocationData => {
      dispatch({ type: 'CHANGE_BEERLOCATION', payload: beerLocationData });
    }
  };
}

export default connect(
  msp,
  mdp
)(Building);
