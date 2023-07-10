import React from 'react';
import styles from './RegisterPage.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constatns';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../services/actions/auth';
import { useForm } from '../../hooks/useForm';

const RegisterPage = () => {
	const dispatch = useDispatch();
	
	const { registerRequest, user } = useSelector(store => store.auth);
	
	const { data, handleData } = useForm({
		name: '',
		email: '',
		password: '',
	});
	
	const onSubmit = (e) => {
		e.preventDefault();
		
		dispatch(register(data));
	};
	
	return (
		<>
			{user ? (
				<Navigate to={ROUTES.main} replace={true}/>
			) : (
				<main>
					<div className="container">
						<div className={styles.wrapper}>
							<h1 className="mb-6 text text_type_main-medium">Регистрация</h1>
							
							<form
								className={styles.form}
								onSubmit={onSubmit}
							>
								<Input
									type="text"
									name="name"
									placeholder="Имя"
									value={data.name}
									onChange={handleData}
								/>
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
									disabled={registerRequest}
								>
									Зарегистрироваться
								</Button>
							</form>
							
							<div className="mt-20">
								<ul className={styles.list}>
									<li>
										<span className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</span>
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

export default RegisterPage;