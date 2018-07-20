import React, { Component } from 'react';
import Building from './Building';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: []
    };
  }

  renderBuildings = () => {
    fetch('https://calm-depths-56846.herokuapp.com/api/v1/buildings')
      .then(r => r.json())
      .then(r => this.saveBuildings(r));
    return;
    debugger;
  };

  saveBuildings = r => {
    const buildingList = [...this.state.buildings];
    r.forEach(building => buildingList.push(building));
    this.setState(
      {
        buildings: buildingList
      },
      () => console.log(this.state)
    );
    debugger;
  };

  render() {
    return (
      <div className="App">
        <div class="p1 m1 border fill rel">
          <div class="f fw x aic">
            <h1 class="fll fa white al" id="title">
              Beer List
            </h1>
            <img src="./wework-logo.svg" class="logo right fa mb1" />
          </div>
          <hr />

          <div id="lists" class="f fw mb1" />
          {this.renderBuildings()}
        </div>
        <div class="rel px1 m1 border bg bxs ac" id="edit">
          <h3 id="edit-txt">Add Beer</h3>
        </div>
        <div class="x rel px1">
          <p class="white fll small my05">
            *Caloric and ABV values are estimates
          </p>
          <p class="white fll small my05 ml1">
            **New beers highlighted for 24 hours
          </p>
          <p class="white fll small my05 ml1">
            For more info email
            <a href="mailto:beersign@servous.co">beersign@servous.co</a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
