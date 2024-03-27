import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import Avatar from 'shared/assets/test/storybook.jpg';

const meta: Meta<typeof ProfileCard> = {
	title: 'entities/ProfileCard',
	component: ProfileCard,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Primary: Story = {
	args: {
		data: {
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
};

export const withError: Story = {
	args: {
		error: 'true',
	},
};

export const Loading: Story = {
	args: {
		isLoading: true,
	},
};
