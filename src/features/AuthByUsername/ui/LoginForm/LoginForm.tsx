import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './LoginForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import Input from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { AppDispatch } from 'app/providers/StoreProvider/config/store';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

export interface LoginFormProps {
	className?: string;
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
	const { t } = useTranslation();
	const dispatch: AppDispatch = useDispatch();
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const error = useSelector(getLoginError);
	const isLoading = useSelector(getLoginIsLoading);

	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setUsername(value));
		},
		[dispatch],
	);

	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value));
		},
		[dispatch],
	);

	const onLoginClick = useCallback(() => {
		dispatch(loginByUsername({ username, password }));
	}, [dispatch, password, username]);

	return (
		<DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
			<form className={classNames(cls.LoginForm, {}, [className])}>
				<Text title={t('Форма авторизации')} />
				{error && (
					<Text
						theme={TextTheme.ERROR}
						description={t('Некорректный логин или пароль')}
					/>
				)}
				<Input
					autofocus
					type="text"
					className={cls.input}
					placeholder={t('Логин')}
					onChange={onChangeUsername}
					value={username}
				/>
				<Input
					type="text"
					className={cls.input}
					placeholder={t('Пароль')}
					onChange={onChangePassword}
					value={password}
				/>
				<Button
					theme={ButtonTheme.OUTLINE}
					className={cls.loginBtn}
					onClick={onLoginClick}
					disabled={isLoading}
				>
					{t('Войти')}
				</Button>
			</form>
		</DynamicModuleLoader>
	);
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
