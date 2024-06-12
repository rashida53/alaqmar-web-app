import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

export default function Nav() {

    return (
        <>
            <div className="navigationBar">
                <ul className="navigationList">
                    <li style={{ float: "left" }}><p className="navLogo">AL AQMAR</p></li>
                    <li>
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>SHOP</Link>
                    </li>
                    <li>
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>PROFILE</Link>
                    </li>
                    <li>
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>HOME</Link>
                    </li>
                    <li>
                        <Link to="/profile" style={{ textDecoration: "none", color: "white" }}>LOGOUT
                        </Link>
                    </li>
                </ul>
            </div>

        </>
    )
}