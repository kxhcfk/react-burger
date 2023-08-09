import React, { FC, } from "react";
import { useDispatch, useSelector } from "../../store/store";
import styles from "./ForgotPasswordPage.module.css";
import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constatns";
import { useForm } from "../../hooks/useForm";
import { restorePassword } from "../../store/actions/auth";

const ForgotPasswordPage: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    
    const {
        restorePasswordRequest,
        restorePasswordSuccess,
    } = useSelector(store => store.auth);
    
    const { data, handleData } = useForm({
        email: "",
    });
    
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        dispatch(restorePassword(data));
    };
    
    return (
        <>
            {restorePasswordSuccess ? (
                <Navigate
                    to={ROUTES.resetPassword}
                    state={{ from: location.pathname }}
                />
            ) : (
                <main>
                    <div className="container">
                        <div className={styles.wrapper}>
                            <h1 className="mb-6 text text_type_main-medium">Восстановление
                                пароля</h1>
                            
                            <form
                                className={styles.form}
                                onSubmit={onSubmit}
                            >
                                <EmailInput
                                    name="email"
                                    placeholder="Укажите e-mail"
                                    value={data.email}
                                    onChange={handleData}
                                />
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    size="medium"
                                    disabled={restorePasswordRequest}
                                >
                                    Восстановить
                                </Button>
                            </form>
                            
                            <div className="mt-20">
                                <ul className={styles.list}>
                                    <li>
                                        <span className="text text_type_main-default text_color_inactive">Вспомнили
                                            пароль?
                                        </span>
                                        <Link
                                            className="ml-1"
                                            to={ROUTES.login}
                                        >
                                            <Button
                                                extraClass={styles.button}
                                                htmlType="button"
                                                type="secondary"
                                                size="medium"
                                            >
                                                Войти
                                            </Button>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default ForgotPasswordPage;