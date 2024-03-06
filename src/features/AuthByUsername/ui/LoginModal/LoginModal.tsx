import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className={classNames('', {}, [className])}
			lazy
		>
			<LoginForm />
		</Modal>
	);
};
