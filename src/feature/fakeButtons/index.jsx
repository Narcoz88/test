import React from "react";
import classes from "./FakeButtons.module.scss";
import FaceBook from "../../components/svg/face";
import Google from "../../components/svg/google";

const FakeButtons = () => {
    return (
        <div className={classes.fakeButtons}>
            <a className={classes.btn} href="/faceBook" onClick={(event) => event.preventDefault()}><FaceBook/><span>Войти через Facebook</span><span className={classes.mobile}></span></a>
            <a className={classes.btn} href="/googelme" onClick={(event) => event.preventDefault()}><Google/><span>Войти через Google</span><span className={classes.mobile}></span></a>
        </div>
    );
};

export default FakeButtons;