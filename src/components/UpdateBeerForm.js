import React, { Component } from 'react';

class UpdateBeerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.keg.id,
      name: this.props.keg.name,
      selectId: this.props.keg.id
    };
  }

  selectHandler = e => {
    this.setState(
      {
        selectId: e.target.value
      },
      () => console.log('updatebeerstate', this.state)
    );
  };
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
            <select onChange={this.selectHandler}>
              {this.props.kegs.map(keg => (
                <option value={keg.id}>{keg.name}</option>
              ))}
            </select>
            <br />
            <button
              onClick={event =>
                this.props.changeKeg(
                  event,
                  this.props.keg,
                  this.state.selectId,
                  this.props.floor
                )
              }
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
