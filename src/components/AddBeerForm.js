import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddBeerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      style: '',
      calories: '',
      abv: ''
    };
  }

  componentDidMount() {
    let beer = this.props.kegs.find(beer => {
      return beer.id === this.props.beerId;
    });
    if (this.props.beerId !== 'adding') {
      this.setState({
        id: this.props.beerId,
        name: beer.name,
        style: beer.style,
        calories: beer.calories,
        abv: beer.abv
      });
    }
  }

  changeBeerState = (key, value) => {
    this.setState(
      {
        ...this.state,
        [key]: value
      },
      () => console.log(this.state)
    );
  };

  addOrUpdateBeer = e => {
    e.preventDefault();
    console.log('addOrUpdateBeer', this.state);
    if (this.props.beerId !== 'adding') {
      fetch(this.props.url + '/api/v1/kegs/' + this.state.id, {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.name,
          style: this.state.style,
          calories: this.state.calories,
          abv: this.state.abv
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      })
        .then(r => r.json())
        .then(keg => this.props.updateKegs(keg))
        .catch(e => console.log(e));
    } else {
      fetch(this.props.url + '/api/v1/kegs', {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.name,
          style: this.state.style,
          calories: this.state.calories,
          abv: this.state.abv
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      })
        .then(r => r.json())
        .then(keg => this.props.addKeg(keg))
        .catch(e => console.log(e));
    }
    this.props.toggle();
  };

  render() {
    if (this.props.open) {
      return (
        <React.Fragment>
          <div className="fill fix f aic jcc z10">
            <div className="fa border mw-1 p1 bg b">
              <div className="x ar" id="x" onClick={this.props.toggle}>
                X
              </div>
              <form>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={e => this.changeBeerState('name', e.target.value)}
                />

                <label>Style</label>
                <input
                  type="text"
                  name="style"
                  placeholder="Style"
                  value={this.state.style}
                  onChange={e => this.changeBeerState('style', e.target.value)}
                />

                <label>Calories</label>
                <input
                  type="text"
                  name="calories"
                  placeholder="Calories"
                  value={this.state.calories}
                  onChange={e =>
                    this.changeBeerState('calories', e.target.value)
                  }
                />

                <label>ABV</label>
                <input
                  type="text"
                  name="abv"
                  placeholder="Decimals only"
                  value={this.state.abv}
                  onChange={e => this.changeBeerState('abv', e.target.value)}
                />
                <div
                  className="px1 mt1 border ac button"
                  id="new-beer"
                  onClick={this.addOrUpdateBeer}
                >
                  <h3 id="add-beer">Update Beer</h3>
                </div>
              </form>
            </div>
          </div>
          <div className="fix fill bg-90 z0" onClick={this.props.toggle} />
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

function msp(state) {
  return {
    kegs: state.kegs,
    url: state.url
  };
}

function mdp(dispatch) {
  return {
    addKeg: kegData => {
      dispatch({ type: 'ADD_KEG', payload: kegData });
    },
    updateKegs: kegsData => {
      dispatch({ type: 'UPDATE_KEG', payload: kegsData });
    },
    changeBeerLocation: beerLocationData => {
      dispatch({ type: 'CHANGE_BEERLOCATION', payload: beerLocationData });
    }
  };
}

export default connect(
  msp,
  mdp
)(AddBeerForm);
