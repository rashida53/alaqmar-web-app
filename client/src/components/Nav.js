import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

export default function Nav() {

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light mainNav">
                <a class="mainNavHeader navbar-brand" style={{ textDecoration: "none", color: "white" }}>Al Aqmar Design Studio</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <Link class="nav-link" to="/" style={{ textDecoration: "none", color: "white" }}>Create Profile</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/profile" style={{ textDecoration: "none", color: "white" }}>View Profile</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* <div className="navigationDesktop">
                <h3 className="navHeader">Al Aqmar Design Studio</h3>
                <div className="navLinks">
                    <ul>
                        <li>
                            <Link to="/" style={{ textDecoration: "none", color: "white" }}><h3>Create Profile</h3></Link>
                        </li>
                        <li>
                            <Link to="/profile" style={{ textDecoration: "none", color: "white" }}><h3>View Profile</h3></Link>
                        </li>
                    </ul>
                </div>
            </div> */}
        </>
    )
}