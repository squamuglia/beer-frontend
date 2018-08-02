import React, { Component } from 'react';
import Floor from './Floor';
import UpdateBeerForm from './UpdateBeerForm';
import UUID from 'uuid';

class Building extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formOpen: false,
      beerSelect: null,
      buildingSelect: null,
      floorSelect: null,
      keg: null
    };
  }

  objectIdComparator = (array, object) =>
    !array.map(item => item.id === object.id).includes(true);

  formDisplay = () => {
    if (this.state.formOpen === true) {
      let allKegs = [];
      let kegSelect = '';
      // this.props.buildings.map(building => {
      //   building.floors.map(floor => {
      //     floor.kegs.forEach(keg => {
      //       if (this.objectIdComparator(allKegs, keg)) {
      //         allKegs.push(keg);
      //       }
      //     });
      //   });
      // });
      console.log('all', allKegs);
      kegSelect = this.props.kegs.find(keg => keg.id === this.state.beerSelect);

      return (
        <UpdateBeerForm
          toggleForm={this.toggleForm}
          keg={kegSelect}
          kegs={this.props.kegs}
          floor={this.state.floorSelect}
          building={this.state.buildingSelect}
        />
      );
    }
  };

  loadBuildings = () => {
    return this.props.buildings.map(building => {
      return (
        <div className="fa" data-buildingid={building.id} id={UUID()}>
          <h3 className="white my05">{building.street}</h3>
          <ul id={UUID()}>
            <Floor floors={building.floors} toggleForm={this.toggleForm} />
          </ul>
        </div>
      );
    });
  };

  toggleForm = (event, id) => {
    this.setState(
      Object.assign({}, this.state, {
        formOpen: !this.state.formOpen,
        beerSelect: id,
        buildingSelect: event.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
          'data-buildingid'
        ),
        floorSelect: event.target.parentElement.parentElement.getAttribute(
          'data-floorid'
        )
      }),
      () => console.log('toggleForm', this.state)
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.formDisplay()}
        {this.loadBuildings()}
      </React.Fragment>
    );
  }
}

export default Building;
