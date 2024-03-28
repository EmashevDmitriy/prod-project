import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RouterPath } from 'shared/config/configRouter/routeConfig';

export function RequireAuth({
	children,
}: {
	children: JSX.Element | React.ReactNode;
}) {
	const auth = useSelector(getUserAuthData);
	const location = useLocation();

	if (!auth) {
		return <Navigate to={RouterPath.main} state={{ from: location }} replace />;
	}

	return children;
}
