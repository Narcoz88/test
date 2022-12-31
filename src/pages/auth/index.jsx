import React from "react";
import classes from "./Auth.module.scss";
import * as yup from "yup";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";
import Button from "../../components/button";
import FakeButtons from "../../feature/fakeButtons";
import {Link} from "react-router-dom";

const Auth = () => {
    const dispatch = useDispatch();
    const {error, correctMail, correctPass} = useSelector(store => store.auth);
    const validationsSchema = yup.object().shape({
        email: yup.string().email("Введите верный email").required("Введите email"),
        password: yup.string().typeError("Должно быть строкой").required("Введите пароль"),
    });

    return (
        <div className={classes.auth}>
            <h1 className="h1">Войти</h1>
            <div className="text center mb mt">Добро пожаловать, рады видеть вас снова 👋</div>
            <FakeButtons />
            <div className="text center mb-18 mt">Или</div>
            <Formik initialValues={{
                email: '',
                password: ''
            }}
                    validateOnBlur
                    onSubmit={(values, {resetForm}) => {
                        if (values.email === correctMail && values.password === correctPass) {
                            console.log("Верные данные");
                            dispatch({type: 'LOGIN', payload: values});
                            console.log("values", values);
                            resetForm();
                        } else {
                            console.log("Отклонено", error);
                            dispatch({type: 'LOGIN', payload: values});
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
                                className={cn(classes.input, { [classes.red]: (touched.email && errors.email) || error })}
                            />
                            <Field
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className={cn(classes.input, { [classes.red]: (touched.password && errors.password) || error })}
                            />
                            {((touched.email && errors.email) || (touched.password && errors.password) || error) && (
                                <div className={classes.error}>
                                    {error && <span>{error}</span>}
                                    {touched.email && errors.email && <span>{errors.email}</span>}
                                    {touched.email && errors.email && touched.password && errors.password && <span>, </span>}
                                    {touched.password && errors.password && <span>{errors.password}</span>}
                                </div>
                            )}
                            <Button title="Войти в аккаунт" submit={true} width={true} disabled={!isValid || !dirty}/>
                        </Form>
                    )
                }
            </Formik>
            <div className="center">
                <Link to="/forgot"><span className={classes.link}>Забыли пароль?</span></Link>
            </div>
        </div>
    );
};

export default Auth;