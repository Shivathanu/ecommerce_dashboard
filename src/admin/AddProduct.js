import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth"
import createProduct from "./apiAdmin";

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const { user, token } = isAuthenticated();

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, loading: true, error: "" });
        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    quantity: '',
                    price: '',
                    photo: '',
                    category: '',
                    shipping: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        })
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange('photo')}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    className="form-control"
                    onChange={handleChange('name')}
                    type="text" name="name" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    className="form-control"
                    onChange={handleChange('description')}
                    name="description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input className="form-control"
                    onChange={handleChange('price')}
                    type="number"
                    name="price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange('category')}
                    className="form-control"
                    name="category"
                >
                    <option value="5dbc6e8b0a45b122c0b03a41">Python</option>
                    <option value="5dbc62ba0a45b122c0b03a3a">Node</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select
                    onChange={handleChange('shipping')}
                    className="form-control"
                    name="shipping"
                >
                    <option value="0">Yes</option>
                    <option value="1">No</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input className="form-control"
                    onChange={handleChange('quantity')}
                    type="number"
                    name="quantity"
                    value={quantity}
                />
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    return (
        <Layout
            title="Add a new product"
            description={`G'day ${user.name}, ready to add a new product?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );

};

export default AddProduct;
