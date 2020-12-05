import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from './cartHelpers';

export const Card = ({
	product,
	showViewProductButton = true,
	showAddToCartButton = true,
	cartUpdate = false,
	showRemoveProductButton = false,
	setRun = f => f, // default value of function
	run = undefined // default value of undefined
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

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

	const addCart = () => {
		addItem(product, () => {
			setRedirect(true);
		})
	};

	const handleChange = productId => event => {
		setRun(!run);
		setCount(event.target.value < 1 ? 1 : event.target.value);
		if (event.target.value >= 1) {
			updateItem(productId, event.target.value)
		}
	}

	const shouldRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};

	const showAddToCart = (showAddToCartButton) => {
		return (
			showAddToCartButton &&
			<button
				onClick={addCart}
				className="btn btn-outline-warning mt-2 mb-2"
			>
				Add to Cart
			</button>
		);
	};

	const showRemoveButton = (showRemoveProductButton) => {
		return (
			showRemoveProductButton &&
			<button
				onClick={() => {
					removeItem(product._id);
					setRun(!run);
				}}
				className="btn btn-outline-danger mt-2 mb-2"
			>
				Remove Product
			</button>
		);
	};

	const showStock = (quantity) => {
		return quantity > 0 ? (
			<span className="badge badge-primary badge-pill">In Stock</span>
		) : (
				<span className="badge badge-primary badge-pill">Out of Stock</span>
			);
	};

	const showCartUpdateOptions = cartUpdate => {
		return cartUpdate && <div>
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text">Adjust Quantity</span>
				</div>
				<input
					type="number"
					className="form-control"
					value={count}
					onChange={handleChange(product._id)}
				/>
			</div>
		</div>
	}

	return (
		<div className="card mx-auto h-100 flex-fill">
			<div className="card-header name">{product.name}</div>
			<div className="card-body">
				{shouldRedirect(redirect)}
				<ShowImage item={product} url="product" />
					<p className="lead mt-2 card-text">
						{product && product.description.substring(0, 80)}
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
				{showAddToCart(showAddToCartButton)}
				{showRemoveButton(showRemoveProductButton)}
				{showCartUpdateOptions(cartUpdate)}
			</div>
		</div>
	);
};
