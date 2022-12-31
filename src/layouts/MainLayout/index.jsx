import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../../feature/header";

const MainLayout = () => {
    return (
        <div className="App">
            <div className="wrap">
                <Header/>
                <div className="container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;