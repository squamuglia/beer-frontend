import React, { Component } from 'react';

class AddBeerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      building: null,
      floor: null,
      name: '',
      style: '',
      calories: '',
      abv: ''
    };
  }

  render() {
    console.log('form props', this.props);

    return (
      <div className="fix fill bg-90 f aic jcc z1">
        <div className="fa border mw-1 p1 bg b z10">
          <div
            className="x ar"
            id="x"
            onClick={event => this.props.toggleForm(event)}
          >
            X
          </div>
          <form>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
            />

            <label>Style</label>
            <input
              type="text"
              name="style"
              placeholder="Style"
              value={this.state.style}
            />

            <label>Calories</label>
            <input
              type="text"
              name="calories"
              placeholder="Calories"
              value={this.state.calories}
            />

            <label>ABV</label>
            <input
              type="text"
              name="abv"
              placeholder="Decimals only"
              value={this.state.abv}
            />
            <div className="px1 mt1 border ac" id="new-beer">
              <h3 id="add-beer">Add Beer</h3>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddBeerForm;
