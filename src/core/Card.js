import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

export const Card = ({ product }) => {
	return (
		<div className="col-md-4 mt-2 mb-2 d-flex">
			<div className="card mx-auto h-100 flex-fill">
				<div className="card-header">{product.name}</div>
				<div className="card-body">
					<ShowImage item={product} url="product" />
					<p className="card-text">{product.description.substring(0, 80)}</p>
					<p className="card-text">${product.price}</p>
				</div>
				<div className="card-footer">
					<Link to="/">
						<button className="btn btn-outline-primary mt-2 mb-2 mr-2">
							View Product
						</button>
						<button className="btn btn-outline-warning mt-2 mb-2">
							Add to Card
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
