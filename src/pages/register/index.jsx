import React, {useState} from "react";
import classes from "./Register.module.scss";
import * as yup from "yup";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";
import Button from "../../components/button";
import FakeButtons from "../../feature/fakeButtons";
import {Navigate} from "react-router-dom";

const Register = () => {
    const [promo, setPromo] = useState(false);
    const dispatch = useDispatch();
    const {register, error} = useSelector(store => store.register);
    const validationsSchema = yup.object().shape({
        name: yup.string().required("Введите имя"),
        email: yup.string().email("Введите верный email").required("Введите email"),
        password: yup.string().typeError("Должно быть строкой").required("Введите пароль"),
    });

    const handlePromo = () => {
        setPromo((prev) => !prev)
    };

    if (register) {
        return <Navigate to="/confirm"/>;
    }

    return (
        <div className={classes.register}>
            <h1 className="h1">Регистрация</h1>
            <div className="text center mb mt">Зарегистрируйся и получи доступ к аналитике аккаунтов. </div>
            <FakeButtons />
            <div className="text center mb-18 mt">Или</div>
            <Formik initialValues={{
                name: '',
                email: '',
                password: '',
                promo: ''
            }}
                    validateOnBlur
                    onSubmit={(values, {resetForm}) => {
                        dispatch({type: 'REGISTER', payload: values});
                        console.log("values", values);
                        resetForm();
                    }}
                    validationSchema={validationsSchema}
            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) =>
                    (
                        <Form className={classes.form}>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Имя"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className={cn(classes.input, { [classes.red]: (touched.name && errors.name) || error })}
                            />
                            {(touched.name && errors.name) && (
                                <div className={classes.error}>
                                    {touched.name && errors.name && <span>{errors.name}</span>}
                                </div>
                            )}
                            <Field
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={cn(classes.input, { [classes.red]: (touched.email && errors.email) || error })}
                            />
                            {(touched.email && errors.email) && (
                                <div className={classes.error}>
                                    {touched.email && errors.email && <span>{errors.email}</span>}
                                </div>
                            )}
                            <Field
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className={cn(classes.input, { [classes.red]: (touched.password && errors.password) || error })}
                            />
                            {(touched.password && errors.password) && (
                                <div className={classes.error}>
                                    {touched.password && errors.password && <span>{errors.password}</span>}
                                </div>
                            )}
                            {promo ? (
                                <Field
                                    type="text"
                                    name="promo"
                                    placeholder="Промокод"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.promo}
                                    className={cn(classes.input)}
                                />
                            ): (
                                <>
                                    <div className="center mt mb">
                                        <span className={classes.link} onClick={handlePromo}>У меня есть промокод</span>
                                    </div>
                                </>
                            )}
                            <Button title="Создать аккаунт" submit={true} width={true} disabled={!isValid || !dirty}/>

                            <div className="center">
                                <span className={classes.offer}>Создавая аккаунт, я согласен с</span> <span className={classes.link} onClick={handlePromo}>условиями оферты</span>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};

export default Register;