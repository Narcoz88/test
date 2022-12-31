import React from "react";
import classes from "./Header.module.scss";
import Button from "../../components/button";
import Logo from "../../components/svg/logo";
import cn from "classnames"
import {Link} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";


const Header = () => {
    const location = useLocation();
    let isAuth = localStorage.getItem("auth");
    const dispatch = useDispatch();
    console.log("isAuth", isAuth);
    const {auth} = useSelector(store => store.auth);
    const logOut = () => {
        localStorage.removeItem("auth");
        dispatch({
            type: "FETCH_AUTH_SUCCESS",
            payload: false
        })
    };
    return (
        <header className={classes.header}>
            <div className={cn("container", classes.wrap)}>
                <div className={classes.logo}>
                    <Link to="/">
                        <Logo/>
                    </Link>
                </div>
                <div className={classes.right}>
                    {auth ? (
                        <>
                            <span className={classes.logOut} onClick={logOut}>выйти</span>
                        </>
                    ) : location.pathname === "/" ? (

                        <>
                            <div className="text hide">У вас нет аккаунта?</div>
                            <div>
                                <Button link="/register" title="Регистрация" small={true}/>
                            </div>
                        </>
                        ) : location.pathname === "/forgot" ? (
                        <>

                        </>
                        ) : (
                        <>
                            <div className="text hide">Уже есть аккаунт?</div>
                            <div>
                                <Button link="/" title="Войти" small={true}/>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;