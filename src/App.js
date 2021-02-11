import {useState, useEffect} from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink,
	Redirect,
	useLocation
} from 'react-router-dom'
import InputMask from 'react-input-mask'
import './App.css'

const apiKey = '3c0d4811f72089fdd67d6ec69ad06889fb03b88a'
const apiUrl = 'https://api.musi4s.website'

export default function App() {
	let [userAuthorized, setUser] = useState('false')
	let userHash = sessionStorage.getItem('userHash')
	
	if(userHash) {
		fetch(apiUrl + '/api/v1/get/auth', {
			method: 'get',
			mode: 'cors',
			headers: {
				'authorization': apiKey,
				'user-hash': userHash
			}
		})
		.then(response => {
			response.json().then(json => {
				if(json.success === 'true') {
					if(json.data) {
						setUser('true')
					}
				}
			})
		})
		.catch(error => {
			console.log('User not authorized.')
		})
	}

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
		let [timerButtonClass, setTimerButtonClass] = useState('s-hidden')
		let [counter, setCounter] = useState(0)
		let [continueButton, setContinueButton] = useState('submit')
		
		const formatTime = time => {
			const minutes = Math.floor(time / 60)
			const seconds = time % 60
			return `${minutes}:${String(seconds).length === 1 ? `0${seconds}` : `${seconds}`}`
		}
		
		useEffect(() => {
			let timer

			if(counter > 0) {
				timer = setTimeout(() => setCounter(c => c - 1), 1000)
			}

			return () => {
				if(timer) {
					clearTimeout(timer)
				}
			}
		}, [counter])

		const codeChanged = e => {
			const regEx = /\d{4}/
			if(regEx.test(e.target.value)) {
				setContinueButton('submit')
			}
			else {
				setContinueButton('button')
			}
		}

		const sendTel = e => {
			e.preventDefault()

			fetch(apiUrl + '/api/v1/post/auth', {
				method: 'post',
				mode: 'cors',
				headers: {
					'authorization': apiKey
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
								setTimerButtonClass('t-timerButton')
								setCounter(300)
								setContinueButton('button')
							}
							else if(json.data.event === 'auth') {
								sessionStorage.setItem('userHash', json.data.hash)
								setUser('true')
							}
						}
					})
				}
				else {
					alert('Ошибка сервера! Пожалуйста, попробуйте позже.')
				}
			})
			.catch(error => {
				alert('Ошибка сервера! Пожалуйста, попробуйте позже.')
			})
		}
		
		if(userAuthorized === 'true') {
			return (
				<Redirect to='/profile/'/>
			)
		}
		else {
			return (
				<main>
					<section className='m-section'>
						<h1>Ваш телефон</h1>
						<form id='l-authForm' onSubmit={sendTel}>
							<InputMask mask='+7 (999) 999-9999' maskChar='_' alwaysShowMask='true'>
								{(inputProps) => <input type={telInput} name='AuthForm[phone]'/>}
							</InputMask>
							<InputMask mask='9999' maskChar='_' alwaysShowMask='true' onChange={codeChanged}>
								{(inputProps) => <input type={codeInput} name='AuthForm[code]'/>}
							</InputMask>
							<button className={timerButtonClass} type={counter === 0 ? 'submit' : 'button'}>Отправить повторно ({formatTime(counter)})</button>
							<span>
								Нажимая кнопку «Продолжить», Вы соглашаетесь с условиями <a href='/docs/doc.pdf' target='_blank' rel='noreferrer'>оферты</a> и даете согласие на обработку <a href='/docs/doc.pdf' target='_blank' rel='noreferrer'>персональных данных</a>
							</span>
							<button type={continueButton}>Продолжить</button>
						</form>
					</section>
				</main>
			)
		}
	}
	
	function Profile() {
		const logout = () => {
			fetch(apiUrl + '/api/v1/get/auth?type=exit', {
				method: 'get',
				mode: 'cors',
				headers: {
					'authorization': apiKey,
					'user-hash': sessionStorage.getItem('userHash')
				}
			})
			.then(response => {
				response.json().then(json => {
					console.log(json)
					if(json.success === 'true') {
						sessionStorage.removeItem('userHash')
						setUser('false')
					}
				})
			})
			.catch(error => {
				console.log('User not authorized.')
			})
		}

		if(userAuthorized === 'false') {
			return (
				<Redirect to='/auth/'/>
			)
		}
		else {
			return (
				<main>
					<section className='m-section'>
						<div id='l-profileLinks'>
							<NavLink to='/profile/' activeClassName='active'>Профиль</NavLink>
							<NavLink to='/orders/' activeClassName='active'>Заказы</NavLink>
							<a href='#' onClick={logout}>Выйти</a>
						</div>
						<div id='l-personalInfo'>
							<input type='file' name='UserForm[picture]'/>
							<article>
								<label>Телефон</label>
								<span></span>
							</article>
						</div>
					</section>
				</main>
			)
		}
	}
	
	function Orders() {
		const logout = () => {
			fetch(apiUrl + '/api/v1/get/auth?type=exit', {
				method: 'get',
				mode: 'cors',
				headers: {
					'authorization': apiKey,
					'user-hash': sessionStorage.getItem('userHash')
				}
			})
			.then(response => {
				response.json().then(json => {
					console.log(json)
					if(json.success === 'true') {
						sessionStorage.removeItem('userHash')
						setUser('false')
					}
				})
			})
			.catch(error => {
				console.log('User not authorized.')
			})
		}

		if(userAuthorized === 'false') {
			return (
				<Redirect to='/auth/'/>
			)
		}
		else {
			return (
				<main>
					<section className='m-section'>
						<div id='l-profileLinks'>
							<NavLink to='/profile/' activeClassName='active'>Профиль</NavLink>
							<NavLink to='/orders/' activeClassName='active'>Заказы</NavLink>
							<a href='#' onClick={logout}>Выйти</a>
						</div>
						<div id='l-personalInfo'></div>
					</section>
				</main>
			)
		}
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

