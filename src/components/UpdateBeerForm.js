import React, { Component } from 'react';
import firebase from '../firebase.js';

class UpdateBeerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.keg
    };
  }

  changeHandler = event => {
    // this.setState(Object.assign({}, this.state, event), () =>
    //   console.log('changeHandler', this.state)
    // );
  };

  render() {
    console.log('form props', this.props);

    return (
      <form>
        <label>Name</label>
        <select onChange={this.changeHandler}>
          <option value="null">No Beer</option>
          {this.props.kegs.map(keg => (
            <option value={keg.id}>{keg.name}</option>
          ))}
        </select>
        <br />
        <button
          onClick={event => this.props.clickHandle(event)}
          className="px1 my1 border ac"
          id="new-beer"
        >
          <div className="s4" id="update-beer">
            Update Beer
          </div>
        </button>
        <hr className="mb1" />
      </form>
    );
  }
}

export default UpdateBeerForm;
