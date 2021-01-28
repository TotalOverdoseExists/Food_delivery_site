import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useLocation
} from 'react-router-dom'
import './App.css'

export default function App() {
	return (
		<Router>
			<Header/>
			<Switch>
				<Route exact path='/auth/' component={Auth}/>
				<Route exact path='/profile/' component={Profile}/>
				<Route exact path='/orders/' component={Orders}/>
				<Route exact path='/basket/' component={Basket}/>
				<Route exact path='/delivery/' component={Delivery}/>
				<Route exact path='/' component={Mainpage}/>
			</Switch>
			<Footer/>
		</Router>
	)
}

function Header() {
	let currentLocation = useLocation()

	if(currentLocation.pathname === '/') {
		return (
			<header>
				<div id='l-personalPanel'>
					<span>Клиентский сервис: <a href='mailto:claim@m-food.ru'>claim@m-food.ru</a></span>
					<Link to='/auth/'>Войти</Link>
				</div>
				<div id='l-menuPanel'>
					<Link to='/'><img className='m-logoImg' src='/img/logo.svg' alt='логотип компании'/></Link>
					<nav>
						<a href='#prices'>Цены</a>
						<a href='#delivery'>Оплата и доставка</a>
						<a href='#about'>О нас</a>
					</nav>
					<div id='l-headerTimeAndTel'>
						<span>с 8:00 до 22:00</span>
						<article>
							<a className='t-bigTel' href='tel:88007758232'>8 800 775 82 32</a>
							<a href='#popupCall'>Перезвоните мне</a>
						</article>
					</div>
				</div>
			</header>
		)
	}
	else {
		return (
			<header>
				<div id='l-menuInnerPanel'>
					<Link to='/'>&lt; Главная</Link>
					<Link to='/'><img className='m-logoImg' src='/img/logo.svg' alt='логотип компании'/></Link>
				</div>
			</header>
		)
	}
}

function Footer() {
	return (
		<footer>
			<div>
				<Link to='/'><img className='m-logoImg' src='/img/logo.svg' alt='логотип компании'/></Link>
				<div id='l-contacts'>
					<h2 className='t-dark'>Наши контакты:</h2>
					<span className='t-light'>
						<a href='tel:88007758232'>8 800 775 82 32</a>
					</span>
					<span className='t-dark'>
						115516, г. Москва, ул. Севанская, д. 52, корп. 1, кв. 57
					</span>
					<span className='t-light'>
						Адрес для корреспонденции:
					</span>
					<span className='t-dark'>
						121471, г. Москва , Рябиновая 26 стр 10 БЦ West Plaza
					</span>
				</div>
				<div id='l-copyright'>
					<span className='t-dark'>
						Copyright 2021 LLC
					</span>
					<span className='t-light'>
						<a href='/docs/doc.pdf' target='_blank'>Оферта</a>
					</span>
					<span className='t-light'>
						<a href='/docs/doc.pdf' target='_blank'>Политика конфиденциальности</a>
					</span>
				</div>
			</div>
			<div>
				<div id='l-footerSocialLinks'>
					<a href='https://www.instagram.com/' target='_blank'>
						<img src='/img/instagram.png'/>
					</a>
					<a href='https://vk.com/' target='_blank'>
						<img src='/img/vk.png'/>
					</a>
					<a href='https://www.facebook.com/' target='_blank'>
						<img src='/img/fb.png'/>
					</a>
				</div>
				<div id='l-footerInfo'>
					<span className='t-dark t-uppercase'>
						ООО «МОЯ ЕДА»<br/>
						ОГРН: 1197746295636<br/>
						ИНН: 7724474343<br/>
						КПП: 772501001
					</span>
				</div>
			</div>
		</footer>
	)
}

function Mainpage() {
	return (
		<h1>Mainpage</h1>
	)
}

function Auth() {
	return (
		<h1>Authorization</h1>
	)
}

function Profile() {
	return (
		<h1>Profile</h1>
	)
}

function Orders() {
	return (
		<h1>Orders</h1>
	)
}

function Basket() {
	return (
		<h1>Basket</h1>
	)
}

function Delivery() {
	return (
		<h1>Delivery</h1>
	)
}