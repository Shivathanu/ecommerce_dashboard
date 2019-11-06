import React, {useState} from "react";
import Layout from "../core/Layout";
import { API } from "../config"

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password } = values;

    const signup = (user) => {
        fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json()
            })
            .catch(error => console.log(error));
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        signup({ name, email, password });
    }

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control"></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control"></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control"></input>
            </div>
            <button onClick={clickSubmit} className="btn-btn-primary">Submit</button>
        </form>
    )
    return (
        <Layout
            title="Signup page"
            description="Sign up to the page"
            className="container col-md-8 offset-md-2">
            {signUpForm()}
            {JSON.stringify(values)}
        </Layout>
    )
};

export default Signup;
