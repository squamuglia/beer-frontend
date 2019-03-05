import React, { Component } from "react";
import Building from "./components/Building";
import firebase from "./firebase";

class App extends Component {
	state = {
		beers: null,
		buildings: null
	};

	componentDidMount() {
		const db = firebase.firestore();
		db.collection("beers").onSnapshot(
			snapshot => {
				const beers = {};
				snapshot.forEach(doc => (beers[doc.id] = doc.data()));
				this.setState({ ...this.state, beers });
			},
			err => console.log("Survey listening error: ", err.message)
		);

		db.collection("buildings").onSnapshot(
			snapshot => {
				const buildings = {};

				snapshot.forEach(doc => (buildings[doc.id] = doc.data()));

				this.setState({ ...this.state, buildings });
			},
			err => console.log("Survey listening error: ", err.message)
		);
	}

	componentWillUnmount() {
		const db = firebase.firestore();

		db.collection("beers").onSnapshot(() => {})();
		db.collection("buildings").onSnapshot(() => {})();
	}

	render() {
		const { buildings, beers } = this.state;

		if (!buildings || !beers) {
			return (
				<div className="fill fix f jcc aic">
					<p className="fa ac">Loading...</p>
				</div>
			);
		} else {
			return (
				<div className="App">
					<div className="p1 mx1 mt1 border fill rel vh">
						<div className="f fw x aic">
							<h1 className="fll fa white al order-2" id="title">
								Beer List
							</h1>
							<img
								src="./wework-logo.svg"
								className="logo right fa"
								alt="logo"
							/>
						</div>
						<hr className="mt05" />

						<div id="lists" className="f fw mb1">
							{Object.keys(buildings).map(key => (
								<Building
									key={key}
									bldgid={key}
									beers={beers}
									building={buildings[key]}
									changeKeg={this.changeKeg}
								/>
							))}
						</div>
					</div>

					<div className="x rel px1">
						<p className="white fll small my05 mr1">
							*ABV values are estimates
						</p>
						<p className="white fll small my05">
							<span role="img" aria-label="broken-heart">
								💔
							</span>
							<a
								href="http://maxsmouha.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								Max Smouha
							</a>
						</p>
					</div>
				</div>
			);
		}
	}
}

export default App;
