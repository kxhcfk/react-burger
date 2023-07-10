import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ResetPasswordPage.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constatns';
import { useForm } from '../../hooks/useForm';
import { resetPassword } from '../../services/actions/auth';

const ResetPasswordPage = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	
	const { resetPasswordSuccess, resetPasswordRequest } = useSelector(store => store.auth);
	
	const { data, handleData } = useForm({
		password: '',
		token: '',
	});
	
	const onSubmit = (e) => {
		e.preventDefault();
		
		dispatch(resetPassword(data));
	};
	
	if (location.state?.from !== ROUTES.forgotPassword) {
		return (
			<Navigate to={ROUTES.forgotPassword} replace={true}/>
		)
	}
	
	return (
		<>
			{resetPasswordSuccess ? (
				<Navigate
					to={ROUTES.main}
					replace={true}
				/>
			) : (
				<main>
					<div className="container">
						<div className={styles.wrapper}>
							<h1 className="mb-6 text text_type_main-medium">Восстановление пароля</h1>
							
							<form
								className={styles.form}
								onSubmit={onSubmit}
							>
								<PasswordInput
									name="password"
									autoComplete="on"
									placeholder="Введите новый пароль"
									value={data.password}
									onChange={handleData}
								/>
								<Input
									type="text"
									name="token"
									placeholder="Введите код из письма"
									value={data.token}
									onChange={handleData}
								/>
								<Button
									htmlType="submit"
									type="primary"
									size="medium"
									disabled={resetPasswordRequest}
								>
									Сохранить
								</Button>
							</form>
							
							<div className="mt-20">
								<ul className={styles.list}>
									<li>
										<span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
										<Link
											className="ml-1"
											to={ROUTES.login}
										>
											<Button
												extraClass={styles.button}
												htmlType="button"
												type="secondary"
												size="medium"
												disabled={resetPasswordRequest}
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

export default ResetPasswordPage;