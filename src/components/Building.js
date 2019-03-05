import React, { Component } from "react";
import Floor from "./Floor";
import UpdateBeerForm from "./UpdateBeerForm";
import firebase from "../firebase";
import uuid from "uuid";

class Building extends Component {
	state = {
		formOpen: false,
		floors: null,
		beerSelect: null,
		floorSelect: null
	};

	componentDidMount() {
		firebase
			.firestore()
			.collection("buildings")
			.doc(this.props.bldgid)
			.collection("floors")
			.orderBy("floor")
			.onSnapshot(
				snapshot => {
					const floors = {};
					snapshot.forEach(doc => (floors[doc.id] = doc.data()));
					this.setState({ ...this.state, floors });
				},
				err => console.log("Survey listening error: ", err.message)
			);
	}

	toggleForm = (key, bid) =>
		this.setState({
			...this.state,
			formOpen: !this.state.formOpen,
			floorSelect: key,
			beerSelect: bid
		});

	render() {
		const { floors } = this.state,
			{ beers, bldgid } = this.props;

		return (
			<>
				{this.state.formOpen && (
					<UpdateBeerForm
						toggleForm={this.toggleForm}
						floor={this.state.floorSelect}
						bid={this.state.beerSelect}
						beers={beers}
						bldgid={bldgid}
					/>
				)}
				<div className="fa col-50" key={uuid()}>
					<h3 className="white mt1 mb05 mr05 pb05 border-bottom">
						{this.props.building.street}
					</h3>
					<ul>
						{floors &&
							Object.keys(floors).map(key => (
								<Floor
									key={key}
									bldgid={bldgid}
									floor={floors[key]}
									beer={beers[floors[key].bid]}
									toggleForm={() =>
										this.toggleForm(key, beers[floors[key].bid])
									}
								/>
							))}
					</ul>
				</div>
			</>
		);
	}
}

export default Building;
