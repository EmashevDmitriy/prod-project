import type { Meta, StoryObj } from '@storybook/react';
import { CommentList } from './CommentList';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta: Meta<typeof CommentList> = {
	title: 'entities/CommentList',
	component: CommentList,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentList>;

export const Primary: Story = {
	args: {
		comments: [
			{
				id: '1',
				text: 'New comment',
				user: { id: '1', username: 'Admin' },
			},
			{
				id: '1',
				text: 'Hello World!',
				user: { id: '2', username: 'Gloomly' },
			},
		],
	},
};

export const Loading: Story = {
	args: {
		comments: [],
		isLoading: true,
	},
};

export const Dark: Story = {
	args: {
		comments: [
			{
				id: '1',
				text: 'New comment',
				user: { id: '1', username: 'Admin' },
			},
			{
				id: '1',
				text: 'Hello World!',
				user: { id: '2', username: 'Gloomly' },
			},
		],
	},
	decorators: [ThemeDecorator(Theme.DARK)],
};
