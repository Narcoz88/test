import React from "react";
import PropTypes from 'prop-types';
import cn from "classnames";
import classes from "./Button.module.scss";
import {Link} from "react-router-dom";

const Button = ({title, link, submit, width, small, children, ...rest}) => {
    return (
        <>
            {link && (<Link to={link}><button className={cn(classes.button, {[classes.w100]: width}, {[classes.small]: small})}>{title}</button></Link>)}
            {submit && (<button type="submit" className={cn(classes.button, {[classes.w100]: width}, {[classes.small]: small})}  {...rest} >{children || title}</button>)}
        </>
    );
};

Button.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    submit: PropTypes.bool,
    width: PropTypes.bool,
    small: PropTypes.bool,
    children: PropTypes.node
};

export default Button;