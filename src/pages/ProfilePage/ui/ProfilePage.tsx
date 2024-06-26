import {
	ProfileCard,
	fetchProfileData,
	getProfileError,
	getProfileForm,
	getProfileIsLoading,
	getProfileReadonly,
	getProfileValidateErrors,
	profileAction,
	profileReducer,
} from 'entities/Profile';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ValidateProfileError } from 'entities/Profile/model/types/profile';
import { useTranslation } from 'react-i18next';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack';

interface ProfilePageProps {
	className?: string;
}

const reducers: ReducersList = {
	profile: profileReducer,
};

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { t } = useTranslation('profile');
	const formData = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadonly);
	const validateErrors = useSelector(getProfileValidateErrors);
	const { id } = useParams<{ id: string }>();

	const validateErrorTranslates = {
		[ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
		[ValidateProfileError.INCORRECT_CITY]: t('Некорректный город'),
		[ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
		[ValidateProfileError.NO_DATA]: t('Данные не указаны'),
		[ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
	};

	const dispatch = useAppDispatch();
	useInitialEffect(() => {
		if (id) {
			dispatch(fetchProfileData(id));
		}
	});

	const onChangeFirstName = useCallback(
		(value?: string) => {
			dispatch(profileAction.updateProfile({ firstName: value || '' }));
		},
		[dispatch],
	);

	const onChangeLastName = useCallback(
		(value?: string) => {
			dispatch(profileAction.updateProfile({ lastName: value || '' }));
		},
		[dispatch],
	);

	const onChangeCity = useCallback(
		(value?: string) => {
			dispatch(profileAction.updateProfile({ city: value || '' }));
		},
		[dispatch],
	);

	const onChangeUsername = useCallback(
		(value?: string) => {
			dispatch(profileAction.updateProfile({ username: value || '' }));
		},
		[dispatch],
	);

	const onChangeAvatar = useCallback(
		(value?: string) => {
			dispatch(profileAction.updateProfile({ avatar: value || '' }));
		},
		[dispatch],
	);

	const onChangeCurrency = useCallback(
		(currency: Currency) => {
			dispatch(profileAction.updateProfile({ currency }));
		},
		[dispatch],
	);

	const onChangeCountry = useCallback(
		(country: Country) => {
			dispatch(profileAction.updateProfile({ country }));
		},
		[dispatch],
	);

	const onChangeAge = useCallback(
		(value?: string) => {
			dispatch(
				profileAction.updateProfile({
					age: Number(value?.replace(/[^\d]/g, '') || 0),
				}),
			);
		},
		[dispatch],
	);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page className={classNames('', {}, [className])}>
				<VStack max gap="16">
					<ProfilePageHeader />
					{validateErrors?.length &&
						validateErrors.map(err => (
							<Text
								key={err}
								theme={TextTheme.ERROR}
								description={validateErrorTranslates[err]}
							/>
						))}
					<ProfileCard
						data={formData}
						isLoading={isLoading}
						error={error}
						onChangeFirstName={onChangeFirstName}
						onChangeLastName={onChangeLastName}
						onChangeCity={onChangeCity}
						onChangeAge={onChangeAge}
						onChangeUsername={onChangeUsername}
						onChangeAvatar={onChangeAvatar}
						onChangeCurrency={onChangeCurrency}
						onChangeCountry={onChangeCountry}
						readonly={readonly}
					/>
				</VStack>
			</Page>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
