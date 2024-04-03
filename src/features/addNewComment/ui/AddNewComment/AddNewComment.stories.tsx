import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import AddNewComment from './AddNewComment';

const meta: Meta<typeof AddNewComment> = {
	title: 'features/AddNewComment',
	component: AddNewComment,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AddNewComment>;

export const Primary: Story = {
	argTypes: {
		onSendComment: { action: 'onSendComment' },
	},
	decorators: [StoreDecorator({})],
};
