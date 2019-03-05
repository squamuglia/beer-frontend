import React, { Component } from "react";
import Select from "react-select";
import firebase from "../firebase";

class UpdateBeerForm extends Component {
	constructor(props) {
		super(props);

		this.state = { bid: this.props.bid };
	}

	selectHandler = e =>
		this.setState({ bid: e.value }, () => console.log(this.state));

	changeBeer = () => {
		console.log(this.props.bldgid, this.props.floor, this.state.bid);
		firebase
			.firestore()
			.collection("buildings")
			.doc(this.props.bldgid)
			.collection("floors")
			.doc(this.props.floor)
			.update({ bid: this.state.bid });

		this.props.toggleForm();
	};

	render() {
		const { beers, toggleForm } = this.props;
		return (
			<div className="fix fill bg-90 f aic jcc z1">
				<div className="fill abs" onClick={toggleForm} />
				<div className="fa border mw-1 p1 bg b z10 m1">
					<div className="x ar pointer" onClick={toggleForm}>
						X
					</div>
					<label>Name</label>
					<Select
						className="selector"
						onChange={this.selectHandler}
						options={Object.keys(beers).map(key => ({
							value: key,
							label: beers[key].name
						}))}
					/>
					<br />
					<button
						className="px1 mt1 border ac"
						onClick={() => this.changeBeer(this.state.selectId)}
					>
						<h3>Update Beer</h3>
					</button>
				</div>
			</div>
		);
	}
}

export default UpdateBeerForm;
