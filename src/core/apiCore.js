import { API } from "../config";

export const getProducts = (sortBy) => {
	return fetch(`${API}/products?sortBy=${sortBy}&limit=6&order=desc`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getCategories = () => {
	return fetch(`${API}/categories`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
	return fetch(`${API}/products/by/search`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ skip, limit, filters }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};
