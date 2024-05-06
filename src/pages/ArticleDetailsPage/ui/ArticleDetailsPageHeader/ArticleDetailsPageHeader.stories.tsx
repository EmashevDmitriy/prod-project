import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof ArticleDetailsPageHeader> = {
	title: 'pages/ArticleDetailsPageHeader',
	component: ArticleDetailsPageHeader,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleDetailsPageHeader>;

export const Primary: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			user: { authData: { id: '1' } },
			articleDetails: { data: { user: { id: '1' } } },
		}),
	],
};

export const PrimaryDark: Story = {
	args: {},
	decorators: [
		ThemeDecorator(Theme.DARK),
		StoreDecorator({
			user: { authData: { id: '1' } },
			articleDetails: { data: { user: { id: '1' } } },
		}),
	],
};

export const WithoutAuth: Story = {
	args: {},
	decorators: [StoreDecorator({})],
};
