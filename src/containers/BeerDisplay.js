import React, { Component } from 'react';
import UpdateBeerForm from '../components/UpdateBeerForm';
import AddBeerForm from '../components/AddBeerForm';
import firebase from 'firebase/app';
import 'firebase/firestore';

class BeerDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: false,
      selectedBeer: null
    };
  }

  toggleForm = () => {
    let toggle = !this.state.form;
    this.setState({ form: toggle });
  };

  beerSubmitter = () => {
    let data = {};
    console.log(data);
    // fetch('calm-depths-56846.herokuapp.com/api/v1/buildings', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
  };

  addBeerToFirebase = () => {
    const itemsRef = firebase.database().ref('items');

    const item = {
      building: this.state.building,
      floor: this.state.floor,
      name: this.state.name,
      style: this.state.style,
      calories: this.state.calories,
      abv: this.state.abv
    };

    itemsRef.push(item);
  };

  formDisplay = () => {
    if (!this.state.form) {
      return (
        <div>
          <h4>Name: {this.props.keg.name}</h4>
          <p>Style: {this.props.keg.style}</p>
          <p>Calories: {this.props.keg.calories}</p>
          <p>ABV: {this.props.keg.abv}%</p>
        </div>
      );
    } else {
      return (
        <AddBeerForm
          keg={this.props.keg}
          kegs={this.props.kegs}
          floor={this.props.floorSelect}
          building={this.props.buildingSelect}
          clickHandle={this.beerSubmitter}
        />
      );
    }
  };

  render() {
    return (
      <div className="fix fill bg-90 f aic jcc z1">
        <div className="fa border mw-1 p1 bg z10">
          <div
            className="x ar"
            id="x"
            onClick={event => this.props.toggleForm(event)}
          >
            X
          </div>
          {this.formDisplay()}
          <button className="px1 py05 mr1" onClick={() => this.toggleForm()}>
            <span className="h4">Change</span>
          </button>
          <button className="px1 py05 flr">
            <span className="h4">Service</span>
          </button>
        </div>
      </div>
    );
  }
}

export default BeerDisplay;
