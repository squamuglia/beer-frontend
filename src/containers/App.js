import React, { Component } from 'react';
import Building from '../components/Building';
import firebase from 'firebase/app';
import 'firebase/firestore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: []
    };
  }

  componentDidMount() {
    fetch('https://calm-depths-56846.herokuapp.com/api/v1/buildings')
      .then(r => r.json())
      .then(r => this.saveBuildings(r));
  }

  saveBuildings = r => {
    const buildingList = [...this.state.buildings];
    r.forEach(building => buildingList.push(building));
    this.setState(
      {
        buildings: buildingList
      },
      () => console.log('saveBuildings', this.state)
    );

    firebase
      .firestore()
      .collection('buildings')
      .add({
        ...this.state.buildings
      });
  };

  render() {
    if (!this.state.buildings) {
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
              <Building buildings={this.state.buildings} />
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

export default App;
