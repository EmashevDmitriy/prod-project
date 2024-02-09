import './styles/index.scss'
import { Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MainPageAsync } from './pages/MainPage/MainPage.async'
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async'
import { Suspense } from 'react'
import { useTheme } from './theme/useTheme'
import { classNames } from './helpers/classNames/classNames'

const App = () => {
	const { changeTheme, theme } = useTheme()
	return (
		<div className={classNames('app', {}, [theme])}>
			<button onClick={changeTheme}>Change Theme</button>
			<Link to='/'>Главная</Link>
			<Link to='/about'>О компании</Link>
			<Suspense fallback={<p>Loading...</p>}>
				<Routes>
					<Route path='/' element={<MainPageAsync />} />
					<Route path='/about' element={<AboutPageAsync />} />
				</Routes>
			</Suspense>
		</div>
	)
}

export default App
