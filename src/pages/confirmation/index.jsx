import React, {useState} from "react";
import classes from "./Confirmation.module.scss";
import cn from "classnames";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import Button from "../../components/button";

const Confirmation = () => {
    const [noMail, setNoMail] = useState(false);
    const name = localStorage.getItem("name");
    const mail = localStorage.getItem("mail");
    console.log("name", name);
    console.log("mail", mail);

    const dispatch = useDispatch();

    const handleSwitch = () => {
        setNoMail((prev) => !prev);
    };
    const validationsSchema = yup.object().shape({
        email: yup.string().email("Введите верный email").required("Введите email")
    });

    if (!noMail) {
        return (
            <div className={classes.confirmation}>
                <h1 className="h1">Подтвердите ваш e-mail</h1>
                <div className="text description center mb">
                    {name}, на ваш E-mail отправлено письмо со ссылкой для <br/> подтверждения.
                    Перейдите по ней, чтобы активировать вашу учетную <br/> запись и получить 7 дней бесплатного доступа.
                </div>
                <div className="center">
                    <a className={classes.button} href={`mailto:${mail}`} target="_blank" rel="noreferrer">Перейти к почте</a>
                </div>
                <div className="center">
                    <span className={classes.link} onClick={handleSwitch}>Мне не пришло письмо</span>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.confirmation}>
            <h1 className="h1">Мне не пришло письмо</h1>
            <div className="text center description mb">
                Письмо может прийти с задержкой в 5-10 минут. <br/>
                Также проверьте разные папки почтового ящика (актуально для gmail.com) и папку <br/> "Спам".
                Если письмо все же не пришло, повторите попытку или напишите об этом в <br/> тех.поддержку
                <span> <a className={cn(classes.link, "description")} href="mailto:support@livedune.ru" target="_blank" rel="noreferrer">support@livedune.ru</a> </span>
                и мы активируем ваш аккаунт.
            </div>
            <Formik initialValues={{
                email: ''
            }}
                    validateOnBlur
                    onSubmit={(values, {resetForm}) => {
                        console.log("Верные данные");
                        dispatch({type: 'CONF', payload: values});
                        console.log("values", values);
                        resetForm();
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

                            {touched.email && errors.email && (
                                <div className={classes.error}>
                                    {touched.email && errors.email && <span>{errors.email}</span>}
                                </div>
                            )}
                            <Button title="Отправить заново" submit={true} width={true} disabled={!isValid || !dirty}/>
                        </Form>
                    )
                }
            </Formik>
            <div className="center">
                <span className={classes.linkGray} onClick={handleSwitch}>Отменить</span>
            </div>
        </div>
    );

};

export default Confirmation;