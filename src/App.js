import {useState} from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useLocation
} from 'react-router-dom'
import InputMask from 'react-input-mask'
import './App.css'

export default function App() {
	let [userAuthorized, setUser] = useState('false')

	function Header() {
		let currentLocation = useLocation()
	
		const ProfileLink = () => {
			if(userAuthorized === 'true') {
				return (
					<Link to='/profile/'>Личный кабинет</Link>
				)
			}
			else {
				return (
					<Link to='/auth/'>Войти</Link>
				)
			}
		}
	
		if(currentLocation.pathname === '/') {
			return (
				<header>
					<div id='l-personalPanel'>
						<span>Клиентский сервис: <a href='mailto:claim@m-food.ru'>claim@m-food.ru</a></span>
						<ProfileLink/>
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
						<a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
							<img src='/img/instagram.png' alt='instagram'/>
						</a>
						<a href='https://vk.com/' target='_blank' rel='noreferrer'>
							<img src='/img/vk.png' alt='vkontakte'/>
						</a>
						<a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
							<img src='/img/fb.png' alt='facebook'/>
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
		let [telInput, setTelInput] = useState('tel')
		let [codeInput, setCodeInput] = useState('hidden')
		const sendTel = e => {
			e.preventDefault()

			fetch('https://api.musi4s.website/api/v1/post/auth', {
				method: 'post',
				mode: 'cors',
				headers: {
					'authorization': '3c0d4811f72089fdd67d6ec69ad06889fb03b88a'
				},
				body: new FormData(e.target)
			})
			.then(response => {
				if(response.ok) {
					response.json().then(json => {
						console.log(json)
						if(json.success === 'true') {
							if(json.data.event === 'code') {
								setTelInput('hidden')
								setCodeInput('text')
							}
							else if(json.data.event === 'auth') {
								<Redirect to='/profile/'/>
							}
						}
					})
				}
			})
			.catch(error => {
				console.log(error)
				alert('Ошибка сервера! Пожалуйста, попробуйте позже.')
			})
		}
		
		return (
			<main>
				<section className='m-section'>
					<h1>Ваш телефон</h1>
					<form id='authForm' onSubmit={sendTel}>
						<InputMask mask='+7 (999) 999-9999' maskChar='_' alwaysShowMask='true'>
							{(inputProps) => <input type={telInput} name='AuthForm[phone]'/>}
						</InputMask>
						<InputMask mask='9999' maskChar='_' alwaysShowMask='true'>
							{(inputProps) => <input type={codeInput} name='AuthForm[code]'/>}
						</InputMask>
						<input type='submit' value='Отправить повторно ()'/>
						<span>
							Нажимая кнопку «Продолжить», Вы соглашаетесь с условиями <a href='/docs/doc.pdf' target='_blank' rel='noreferrer'>оферты</a> и даете согласие на обработку <a href='/docs/doc.pdf' target='_blank' rel='noreferrer'>персональных данных</a>
						</span>
						<button type='submit'>Продолжить</button>
					</form>
				</section>
			</main>
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

