import React, { Component } from 'react';
import { connect } from 'react-redux';
import Building from '../components/Building';

class App extends Component {
  constructor(props) {
    super(props);

    this.url = 'http://localhost:3000';
    // this.url = 'https://calm-depths-56846.herokuapp.com'
  }

  componentDidMount() {
    fetch(this.url + '/api/v1/buildings')
      .then(r => r.json())
      .then(buildings => this.props.addBuildings(buildings));
    fetch(this.url + '/api/v1/floors')
      .then(r => r.json())
      .then(floors => this.props.addFloors(floors));
    fetch(this.url + '/api/v1/kegs')
      .then(r => r.json())
      .then(kegs => this.props.addKegs(kegs));
    fetch(this.url + '/api/v1/beerlocations')
      .then(r => r.json())
      .then(beerLocations => this.props.addBeerLocations(beerLocations));
  }

  // saveItems = (r, item, state) => {
  //   const itemList = [...state];
  //   r.forEach(item => itemList.push(item));
  //   this.setState(
  //     {
  //       [item]: itemList
  //     },
  //     () => console.log('items', this.state)
  //   );
  // };

  // changeKeg = (e, keg, kegSelect, floor) => {
  //   e.preventDefault();
  //   const floorNum = parseInt(floor);
  //   const location_id = this.state.beerLocations.find(beerLocation => {
  //     return (
  //       beerLocation.floor.number == floor && beerLocation.keg.id == keg.id
  //     );
  //   });

  //   fetch(this.url + '/api/v1/beerlocations/' + location_id.id, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       keg_id: kegSelect,
  //       floor_id: floorNum
  //     }),
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(r => r.json())
  //     .then(r => console.log('response', r));
  // };

  render() {
    console.log('the props', this.props);

    if (!this.props.buildings) {
      return (
        <div className="fill fix f jcc aic">
          <p className="fa ac">Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="p1 mx1 mt1 border fill rel">
            <div className="f fw x aic">
              <h1 className="fll fa white al" id="title">
                Beer List
              </h1>
              <img
                src="./wework-logo.svg"
                className="logo right fa mb1"
                alt="logo"
              />
            </div>
            <hr />

            <div id="lists" className="f fw mb1">
              <Building changeKeg={this.changeKeg} />
            </div>
          </div>
          <div className="x rel px1">
            <p className="white fll small my05">
              *Caloric and ABV values are estimates
            </p>
            <p className="white fll small my05 ml1">
              **New beers highlighted for 24 hours
            </p>
            <p className="white fll small my05 ml1">
              For more info email{' '}
              <a href="mailto:beersign@servous.co">beersign@servous.co</a>
            </p>
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
)(App);
