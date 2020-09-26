import { API } from "../config"

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&limit=6&order=desc`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};
