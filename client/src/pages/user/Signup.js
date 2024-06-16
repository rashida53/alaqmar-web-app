import React from "react";
import Auth from "../../utils/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ADD_USER } from "../user/gql/mutations";

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signup] = useMutation(ADD_USER);
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {
            const { data } = await signup({
                variables: {
                    email: formData.email.toLowerCase(),
                    fullName: formData.fullName,
                    password: formData.password,
                    its: formData.its,
                },
            });

            Auth.login(data.addUser.token);
            navigate('/profileSetup');
        } catch (err) {
            let errorMessage = document.querySelector('.errMsg')
            errorMessage.innerHTML = err.message
        }
    }


    return (
        <>
            <div className="mainContainer">
                <div className="imageContainer">

                </div>
                <div className='loginForm'>
                    <h1 className="logoFont">AL AQMAR</h1>
                    <h1 className="loginHeader">SIGN UP</h1>
                    <p>Already have an account? <Link to="/login" style={{ textDecoration: "none", color: "black" }}>Log In</Link></p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor='fullName'></label>
                        <input placeholder="FULL NAME" {...register("fullName", { required: true })} />
                        {errors.fullName && <p>This field is required</p>}

                        <label htmlFor='its'></label>
                        <input placeholder="ITS"{...register("its", { required: true })} />
                        {errors.its && <p>This field is required</p>}

                        <label htmlFor='email'></label>
                        <input placeholder="EMAIL"
                            {...register("email", {
                                pattern: /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                                required: true,
                            })}

                        />
                        {errors.email && <p>This field is required</p>}

                        <label htmlFor='password'></label>
                        <input
                            placeholder="PASSWORD"
                            type="password"
                            {...register("password", { required: true })}

                        />
                        {errors.password && <p>This field is required</p>}

                        <div className="errorBox">
                            <p className='errMsg'></p>
                        </div>

                        <div className='loginButton'>
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Signup;