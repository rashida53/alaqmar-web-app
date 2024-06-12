import React from "react";
import Auth from "../../utils/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../user/gql/mutations";
import Nav from "../../components/Nav";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [login] = useMutation(LOGIN_USER);

    const onSubmit = async (formData, event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: {
                    email: formData.email.toLowerCase(),
                    password: formData.password,
                },
            });
            Auth.login(data.login.token);
        } catch (err) {
            let errorMessage = document.querySelector('.errMsg')
            errorMessage.innerHTML = err.message
        }
    };

    return (
        <>
            {/* <Nav /> */}
            <div className='mainContainer'>
                <div className="imageContainer">

                </div>
                <div className='loginForm'>
                    <h1 className="logoFont">AL AQMAR</h1>
                    <h1 className="loginHeader">LOG IN</h1>
                    <p>Don't have an account? Sign up</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor='email'></label>
                        <input placeholder="EMAIL" {...register("email", { required: true })}
                        />
                        {errors.email && <p>This field is required</p>}

                        <label htmlFor='password'></label>
                        <input type="password" placeholder="PASSWORD" {...register("password", { required: true })}
                        />
                        {errors.password && <p>This field is required</p>}

                        <div className="errorBox">
                            <p className='errMsg'></p>
                        </div>

                        <div className='loginButton'>
                            <button type="submit">Log In</button>
                        </div>
                    </form>
                </div>


                {/* <div>
                    <Link to={`/reset`} style={{ textDecoration: "none", display: 'flex', justifyContent: 'center' }}>
                        <p className="forgotPasswordMsg">Forgot password</p>
                    </Link>

                </div> */}
            </div>
        </>
    )
};

export default Login;
