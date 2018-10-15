import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddBeerForm from './AddBeerForm';
import Logout from './Logout';
import UUID from 'uuid';

class BeerMasterList extends Component {
  state = {
    displayEditForm: false,
    activeBeer: 1
  };

  toggleEditForm = id => {
    this.setState({
      displayEditForm: !this.state.displayEditForm,
      activeBeer: id
    });
  };

  listBeers = () => {
    return this.props.kegs.map(beer => {
      return (
        <tr key={UUID()}>
          <td key={UUID()} className="px05">
            {beer.name}
          </td>
          <td key={UUID()} className="px05">
            {beer.style}
          </td>
          <td key={UUID()} className="px05">
            {beer.calories}
          </td>
          <td key={UUID()} className="px05">
            {beer.abv}
          </td>
          <td
            key={UUID()}
            className="ac"
            onClick={() => this.toggleEditForm(beer.id)}
          >
            edit
          </td>
        </tr>
      );
    });
  };

  displayForm = () => {
    if (this.state.displayEditForm) {
      return (
        <AddBeerForm
          open={this.state.displayEditForm}
          beerId={this.state.activeBeer}
          toggle={() => this.toggleEditForm(this.state.activeBeer)}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.displayForm()}
        <table className="x al">
          <tbody>
            <tr>
              <th className="px05">Beer</th>
              <th className="px05">Style</th>
              <th className="px05">Calories</th>
              <th className="px05">ABV</th>
              <th
                className="ac px05 under"
                onClick={() => this.toggleEditForm('adding')}
              >
                <strong>+ Add New Beer</strong>
              </th>
            </tr>
            {this.listBeers()}
          </tbody>
        </table>
        <Logout />
      </React.Fragment>
    );
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
    logout: () => {
      dispatch({ type: 'LOGOUT' });
    }
  };
}

export default connect(
  msp,
  mdp
)(BeerMasterList);
