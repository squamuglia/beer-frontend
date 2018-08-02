import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

class AddBeerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.keg.name,
      style: this.props.keg.style,
      calories: this.props.keg.calories,
      abv: this.props.keg.abv
    };
  }

  addBeerToFirebase = () => {
    const itemsRef = firebase.database().ref('items');

    const item = {
      name: this.state.name,
      style: this.state.style,
      calories: this.state.calories,
      abv: this.state.abv
    };

    itemsRef.push(item);
  };

  render() {
    console.log('form props', this.props);

    return (
      <React.Fragment>
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
          <button
            className="px1 py05 mt1"
            id="new-beer"
            onClick={this.addBeerToFirebase}
          >
            <span className="s4" id="add-beer">
              Add Beer
            </span>
          </button>
        </form>
        <hr className="my1" />
      </React.Fragment>
    );
  }
}

export default AddBeerForm;
