import React from "react";
import classes from "../forgotPassword/Forgot.module.scss";
import cn from "classnames";
import {Field, Form, Formik} from "formik";
import Button from "../../components/button";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {Link} from "react-router-dom";
import Forgot from "../../components/svg/forgot";
import Loader from "../../components/loader";
import Post from "../../components/svg/post";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const {forgot, loading, error} = useSelector(store => store.forgot);
    const {correctMail} = useSelector(store => store.auth);
    const validationsSchema = yup.object().shape({
        email: yup.string().email("Введите верный email").required("Введите email")
    });
    if (!forgot) {
        return (
            <div className={classes.forgot}>
                <div className="center icon2"><Forgot/></div>
                <h2 className="h2">Восстановить пароль</h2>
                <div className="text center description mb">
                    Введите e-mail, на который регистрировались ранее
                </div>
                <Formik initialValues={{
                    email: ''
                }}
                        validateOnBlur
                        onSubmit={(values, {resetForm}) => {
                            if (values.email === correctMail) {
                                console.log("Верные данные");
                                dispatch({type: 'FORGOT', payload: values});
                                console.log("values", values);
                                resetForm();
                            } else {
                                console.log("Отклонено");
                                dispatch({type: 'FORGOT', payload: values});
                            }
                        }}
                        validationSchema={validationsSchema}
                >
                    {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) =>
                        (
                            <Form className={classes.form}>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className={cn(classes.input, { [classes.red]: (touched.email && errors.email)})}
                                />

                                {((touched.email && errors.email) || error) && (
                                    <div className={classes.error}>
                                        {error && <span>{error}</span>}
                                        {touched.email && errors.email && <span>{errors.email}</span>}
                                    </div>
                                )}
                                <Button submit={true} width={true} disabled={!isValid || !dirty}>
                                    {!loading ? (<>Отправить</>) : (
                                        <>
                                            <span className={classes.wrapLoader}>
                                                <span style={{marginLeft: "-44px"}}><Loader/></span> Отправка
                                            </span>
                                        </>
                                    )}
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
                <div className="center">
                    <Link to="/">
                        <span className={classes.linkGray}>Отменить</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(classes.forgot, classes.forgot2)}>
            <div className="center icon"><Post/></div>
            <h2 className="h2">Письмо отправленно</h2>
            <div className="text center description mb">
                На указанный вами e-mail было отправлено <br/>письмо для смены пароля
            </div>
            <div className="center max">
                <Button title="Вернуться на главную" width={true} link="/"/>
            </div>
        </div>
    );
};

export default ForgotPassword;