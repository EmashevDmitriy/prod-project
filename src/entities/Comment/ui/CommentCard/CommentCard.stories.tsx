import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { CommentCard } from './CommentCard';

const meta: Meta<typeof CommentCard> = {
	title: 'entities/CommentCard',
	component: CommentCard,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentCard>;

export const Primary: Story = {
	args: {
		comment: {
			id: '1',
			text: 'New comment',
			user: { id: '1', username: 'Admin' },
		},
	},
};

export const Loading: Story = {
	args: {
		comment: {
			id: '1',
			text: 'New comment',
			user: { id: '1', username: 'Admin' },
		},
		isLoading: true,
	},
};

export const Dark: Story = {
	args: {
		comment: {
			id: '1',
			text: 'New comment',
			user: { id: '1', username: 'Admin' },
		},
	},
	decorators: [ThemeDecorator(Theme.DARK)],
};
