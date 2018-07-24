import React, { Component } from 'react';

class UpdateBeerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.keg
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
            <select>
              <option value="null">No Beer</option>
              {this.props.kegs.map(keg => (
                <option value={keg.id}>{keg.name}</option>
              ))}
            </select>
            <br />
            <button
              onClick={event => console.log(event)}
              className="px1 mt1 border ac"
              id="new-beer"
            >
              <h3 id="update-beer">Update Beer</h3>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateBeerForm;
