import React from 'react';
import { useDispatch, useSelector } from "../../store/store";
import styles from './LoginPage.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constatns';
import { login } from '../../store/actions/auth';
import { useForm } from '../../hooks/useForm';

const LoginPage = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	
	const { loginRequest, user } = useSelector(store => store.auth);
	
	const { data, handleData } = useForm({
		email: '',
		password: '',
	});
	
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		dispatch(login(data));
	};
	
	return (
		<>
			{user ? (
				<Navigate
					to={location.state?.from || ROUTES.main}
					replace={true}
				/>
			) : (
				<main>
					<div className="container">
						<div className={styles.wrapper}>
							<h1 className="mb-6 text text_type_main-medium">Войти</h1>
							
							<form
								className={styles.form}
								onSubmit={onSubmit}
							>
								<EmailInput
									name="email"
									value={data.email}
									onChange={handleData}
								/>
								<PasswordInput
									name="password"
									autoComplete="on"
									value={data.password}
									onChange={handleData}
								/>
								<Button
									htmlType="submit"
									type="primary"
									size="medium"
									disabled={loginRequest}
								>
									Войти
								</Button>
							</form>
							
							<div className="mt-20">
								<ul className={styles.list}>
									<li>
										<span className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</span>
										<Link
											className="ml-1"
											to={ROUTES.register}
										>
											<Button
												extraClass={styles.button}
												htmlType="button"
												type="secondary"
												size="medium"
											>
												Зарегистрироваться
											</Button>
										</Link>
									</li>
									<li>
										<span className="text text_type_main-default text_color_inactive">Забыли пароль?</span>
										<Link
											className="ml-1"
											to={ROUTES.forgotPassword}
										>
											<Button
												extraClass={styles.button}
												htmlType="button"
												type="secondary"
												size="medium"
											>
												Восстановить пароль
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

export default LoginPage;