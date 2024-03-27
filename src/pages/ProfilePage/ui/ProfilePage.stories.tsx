import { Meta, StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import Avatar from 'shared/assets/test/storybook.jpg';

const meta: Meta<typeof ProfilePage> = {
	title: 'pages/ProfilePage',
	component: ProfilePage,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Light: Story = {
	decorators: StoreDecorator({
		profile: {
			form: {
				firstName: 'Ivan',
				lastName: 'Ivanov',
				age: 22,
				username: 'admin',
				country: Country.Russia,
				currency: Currency.RUB,
				city: 'Moscow',
				avatar: Avatar,
			},
		},
	}),
};

export const Dark: Story = {
	decorators: [
		ThemeDecorator(Theme.DARK),
		StoreDecorator({
			profile: {
				form: {
					firstName: 'Ivan',
					lastName: 'Ivanov',
					age: 22,
					username: 'admin',
					country: Country.Russia,
					currency: Currency.RUB,
					city: 'Moscow',
					avatar: Avatar,
				},
			},
		}),
	],
};
