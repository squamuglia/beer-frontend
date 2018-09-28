import React, { Component } from 'react';
import Select from 'react-select';

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
        selectId: parseInt(e.value, 10)
      },
      () => console.log('updatebeerstate', this.state)
    );
  };

  render() {
    console.log(
      'kegs select',
      this.props.kegs.map(keg => ({
        value: keg.id,
        label: keg.name
      }))
    );
    return (
      <div className="fix fill bg-90 f aic jcc z1">
        <div className="fa border mw-1 p1 bg b z10 m1">
          <div
            className="x ar"
            id="x"
            onClick={event => this.props.toggleForm(event)}
          >
            X
          </div>
          <form>
            <label>Name</label>
            <Select
              className="selector"
              onChange={this.selectHandler}
              options={this.props.kegs.map(keg => ({
                value: keg.id,
                label: keg.name
              }))}
            />
            <br />
            <div
              onClick={event =>
                this.props.changeKeg(event, this.state.selectId)
              }
              className="px1 mt1 border ac"
              id="new-beer"
            >
              <h3 id="update-beer">Update Beer</h3>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateBeerForm;
