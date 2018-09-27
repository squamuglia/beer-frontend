import React, { Component } from 'react';

class EditBeerForm extends Component {
  state = {};

  changeKeg = (e, kegSelect) => {
    e.preventDefault();
    fetch(this.props.url + '/api/v1/beerlocations/' + this.state.beerLocation, {
      method: 'POST',
      body: JSON.stringify({
        keg_id: kegSelect,
        floor_id: this.state.floorSelect
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(beerLocation => this.props.changeBeerLocation(beerLocation));
  };

  render() {
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
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  msp,
  mdp
)(EditBeerForm);
