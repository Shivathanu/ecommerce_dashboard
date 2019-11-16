import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import Layout from "../core/Layout";
import { signin } from "../auth"

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        readirectToReferrer: false,
    });

    const { email, password, loading, error, readirectToReferrer } = values;

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({
            ...values,
            error: false,
            loading: true
        })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        loading: false
                    })
                } else {
                    setValues({
                        ...values,
                        readirectToReferrer: true
                    });
                }
            });
    };

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn-btn-primary">Submit</button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>        
        )
    );

    const redirectUser = () => {
        if (readirectToReferrer) {
            return <Redirect to="/" />
        }
    }

    return (
        <Layout
            title="Signup page"
            description="Sign up to the page"
            className="container col-md-8 offset-md-2">
            {showLoading()}
            {redirectUser()}
            {showError()}
            {signUpForm()}
        </Layout>
    )
};

export default Signin;
