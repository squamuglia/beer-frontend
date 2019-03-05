import React from "react";

export default ({ floor, beer, toggleForm }) => (
	<li className="white">
		<div className="f x mb025">
			<div>
				<div className="circle border fll mr1 mt05 ac w30">{floor.floor}</div>
			</div>
			<div className="fa">
				<h4 className="pointer caps" onClick={toggleForm}>
					{beer.name}
				</h4>
				<span className="b">Style:</span> {beer.style}
				<span className="mr1" />
				<span className="b">ABV: </span>
				{beer.abv}
			</div>
		</div>
	</li>
);
