import {
	ProfileCard,
	fetchProfileData,
	getProfileError,
	getProfileForm,
	getProfileIsLoading,
	getProfileReadonly,
	profileAction,
	profileReducer,
} from 'entities/Profile';
import { useCallback, useEffect } from 'react';
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

interface ProfilePageProps {
	className?: string;
}

const reducers: ReducersList = {
	profile: profileReducer,
};

const ProfilePage = ({ className }: ProfilePageProps) => {
	const formData = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadonly);

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchProfileData());
	}, [dispatch]);

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
			<div className={classNames('', {}, [className])}>
				<ProfilePageHeader />
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
			</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
