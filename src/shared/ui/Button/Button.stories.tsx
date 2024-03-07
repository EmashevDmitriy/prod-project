import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta: Meta<typeof Button> = {
	title: 'shared/Button',
	component: Button,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: 'Primary',
	},
};

export const Clear: Story = {
	args: {
		children: 'Clear',
		theme: ButtonTheme.CLEAR,
	},
};

export const ClearInverted: Story = {
	args: {
		children: 'ClearInv',
		theme: ButtonTheme.CLEAR_INVERTED,
	},
};

export const Outline: Story = {
	args: {
		children: 'Outline',
		theme: ButtonTheme.OUTLINE,
	},
};

export const OutlineSizeL: Story = {
	args: {
		children: 'Outline',
		theme: ButtonTheme.OUTLINE,
		size: ButtonSize.L,
	},
};

export const OutlineSizeXL: Story = {
	args: {
		children: 'Outline',
		theme: ButtonTheme.OUTLINE,
		size: ButtonSize.XL,
	},
};

export const OutlineDark: Story = {
	args: {
		children: 'Outline',
		theme: ButtonTheme.OUTLINE,
	},
	decorators: [ThemeDecorator(Theme.DARK)],
};

export const Background: Story = {
	args: {
		children: 'Background',
		theme: ButtonTheme.BACKGROUND,
	},
};

export const backgroundInverted: Story = {
	args: {
		children: 'BackgroundInv',
		theme: ButtonTheme.BACKGROUND_INVERTED,
	},
};

export const SquareSizeM: Story = {
	args: {
		children: '>',
		theme: ButtonTheme.BACKGROUND_INVERTED,
		square: true,
	},
};

export const SquareSizeL: Story = {
	args: {
		children: '>',
		theme: ButtonTheme.BACKGROUND_INVERTED,
		square: true,
		size: ButtonSize.L,
	},
};

export const SquareSizeXL: Story = {
	args: {
		children: '>',
		theme: ButtonTheme.BACKGROUND_INVERTED,
		square: true,
		size: ButtonSize.XL,
	},
};

export const Disabled: Story = {
	args: {
		children: 'Disabled',
		theme: ButtonTheme.OUTLINE,
		disabled: true,
	},
};
