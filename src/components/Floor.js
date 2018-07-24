import React, { Component } from 'react';

class Floor extends Component {
  constructor(props) {
    super(props);
  }

  loadFloors = () => {
    return this.props.floors.map(floor => {
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
    console.log('render floors', this.props.floors);
    return <React.Fragment>{this.loadFloors()}</React.Fragment>;
  }
}

export default Floor;
