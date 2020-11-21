import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

export const Card = ({ product, showViewProductButton = true }) => {
	const showViewButton = (showViewProductButton) => {
		return (
			showViewProductButton && (
				<Link to={`/product/${product._id}`} className="mr-2">
					<button className="btn btn-outline-primary mt-2 mb-2 mr-2">
						View Product
					</button>
				</Link>
			)
		);
	};

	const showAddToCartButton = () => {
		return (
			<button className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>
		);
	};

	const showStock = (quantity) => {
		return quantity > 0 ? (
			<span className="badge badge-primary badge-pill">In Stock</span>
		) : (
				<span className="badge badge-primary badge-pill">Out of Stock</span>
			);
	};

	return (
		<div className="card mx-auto h-100 flex-fill">
			<div className="card-header name">{product.name}</div>
			<div className="card-body">
				<ShowImage item={product} url="product" />
				<p className="lead mt-2 card-text">
					{product.description.substring(0, 80)}
				</p>
				<p className="black-10 card-text">${product.price}</p>
				<p className="black-9 card-text">
					Category: {product.category && product.category.name}
				</p>
				<p className="black-8 card-text">
					Added on {moment(product.createdAt).fromNow()}
				</p>
			</div>
			<div className="card-footer">
				{showStock(product.quantity)}
				<br />
				{showViewButton(showViewProductButton)}
				{showAddToCartButton()}
			</div>
		</div>
	);
};
