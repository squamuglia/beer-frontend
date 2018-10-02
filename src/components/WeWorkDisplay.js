import React, { Component } from 'react';
import { connect } from 'react-redux';
import Floor from './Floor';
import UpdateBeerForm from './UpdateBeerForm';
import UUID from 'uuid';

class WeWorkDisplay extends Component {
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
    setTimeout(() => {
      console.log('refreshed');
      fetch(this.props.url + '/api/v1/beerlocations')
        .then(r => r.json())
        .then(beerLocations => this.props.refreshLocations(beerLocations))
        .catch(e => console.log(e));
    }, 10000);

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
      <div id="lists" className="f fw mb1">
        {this.formDisplay()}
        {this.loadFloors()}
        <div className="white fix bottom right small pb2 mr1">
          Visit beer.topset.co to view on the go!
        </div>
      </div>
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
    refreshLocations: beerLocationsData => {
      dispatch({ type: 'REFRESH_LOCATIONS', payload: beerLocationsData });
    },
    changeBeerLocation: beerLocationData => {
      dispatch({ type: 'CHANGE_BEERLOCATION', payload: beerLocationData });
    }
  };
}

export default connect(
  msp,
  mdp
)(WeWorkDisplay);
