import React from "react";
import classes from "./Loader.module.scss";
import Load from "../svg/load";

const Loader = () => {
    return (
        <div className={classes.loader}><Load/></div>
    );
};

export default Loader;