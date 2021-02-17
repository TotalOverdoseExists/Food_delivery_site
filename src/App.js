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
import Modal from 'react-modal'
import './App.css'

const apiKey = '3c0d4811f72089fdd67d6ec69ad06889fb03b88a'
const apiUrl = 'https://api.musi4s.website'

const modalStyles = {
	content: {
		top: '25%',
		left: '25%',
		right: '25%',
		bottom: '25%',
		borderRadius: '1rem',
		padding: '2.5rem 5rem'
	}
}

Modal.setAppElement('#root')

export default function App() {
	let [userAuthorized, setUserAuthorized] = useState(false)

	if(sessionStorage.getItem('userHash')) {
		fetch(apiUrl + '/api/v1/get/auth', {
			method: 'get',
			mode: 'cors',
			headers: {
				'authorization': apiKey,
				'user-hash': sessionStorage.getItem('userHash')
			}
		})
		.then(response => {
			response.json().then(json => {
				if(json.success) {
					if(json.data) {
						setUserAuthorized(true)
					}
				}
			})
		})
		.catch(error => {
			console.log(error)
		})
	}

	function Header() {
		let currentLocation = useLocation()
		const [modalIsOpen, setIsOpen] = useState(false)
	
		const ProfileLink = () => {
			if(userAuthorized) {
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

		const openModal = () => {
			setIsOpen(true)
		}

		const closeModal = () => {
			setIsOpen(false)
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
								<button className='m-linkButton' onClick={openModal}>Перезвоните мне</button>
								<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
									<button className='m-linkButton m-closeModalButton' onClick={closeModal}>&#10006;</button>
									<h2>Заказать обратный звонок</h2>
									<form>
										<article>
											<input type='text' name='RequestForm[name]' placeholder='Имя'/>
										</article>
										<article>
											<InputMask mask='+7 (999) 999-9999' maskChar='_' alwaysShowMask='true'>
												{(inputProps) => <input type='tel' name='RequestForm[phone]'/>}
											</InputMask>
										</article>
										<article>
											<input type='checkbox' name='RequestForm[agreement]' id='agreement'/>
										</article>
										<button type='submit'>Отправить</button>
									</form>
								</Modal>
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
			<main>
				<section className='m-section'>

				</section>
			</main>
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

		const authorization = e => {
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
						if(json.success) {
							if(json.data.event === 'code') {
								setTelInput('hidden')
								setCodeInput('text')
								setTimerButtonClass('t-timerButton')
								setCounter(300)
								setContinueButton('button')
							}
							else if(json.data.event === 'auth') {
								sessionStorage.setItem('userHash', json.data.hash)
								setUserAuthorized(true)
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
		
		if(userAuthorized) {
			return (
				<Redirect to='/profile/'/>
			)
		}
		else {
			return (
				<main>
					<section className='m-section'>
						<h1>Ваш телефон</h1>
						<form id='l-authForm' onSubmit={authorization}>
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
	
	function ProfileLinks() {
		return(
			<div id='l-profileLinks'>
				<NavLink to='/profile/' activeClassName='active'>Профиль</NavLink>
				<NavLink to='/orders/' activeClassName='active'>Заказы</NavLink>
			</div>
		)
	}

	function Profile() {
		const [error, setError] = useState(null)
		const [isLoaded, setIsLoaded] = useState(false)
		const [items, setItems] = useState([])
		const [modalIsOpen, setIsOpen] = useState(false)
		const [addressChanged, setAddressChanged] = useState(0)

		useEffect(() => {
			let isMounted = true

			fetch(apiUrl + '/api/v1/get/user', {
				method: 'get',
				mode: 'cors',
				headers: {
					'authorization': apiKey,
					'user-hash': sessionStorage.getItem('userHash')
				}
			})
			.then(response => response.json())
			.then(
				result => {
					setIsLoaded(true)
					setItems(result)
					console.log(result)
				},
				error => {
					setIsLoaded(true)
					setError(error)
				}
			)

			return () => {
				isMounted = false
			}
		}, [])

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
					if(json.success) {
						sessionStorage.removeItem('userHash')
						setUserAuthorized(false)
					}
				})
			})
			.catch(error => {
				alert('Ошибка сервера! Пожалуйста, попробуйте позже.')
			})
		}

		const openModal = () => {
			setIsOpen(true)
		}

		const closeModal = () => {
			setIsOpen(false)
		}

		const editInfo = e => {
			e.preventDefault()

			fetch(apiUrl + '/api/v1/post/update?type=user', {
				method: 'post',
				mode: 'cors',
				headers: {
					'authorization': apiKey,
					'user-hash': sessionStorage.getItem('userHash')
				},
				body: new FormData(e.target)
			})
			.then(response => {
				response.json().then(json => {
					if(json.success) {
						alert('Данные успешно обновлены!')
					}
				})
			})
			.catch(error => {
				alert('Ошибка сервера! Пожалуйста, попробуйте позже.')
			})
		}

		const addAddress = e => {
			e.preventDefault()

			fetch(apiUrl + '/api/v1/post/address', {
				method: 'post',
				mode: 'cors',
				headers: {
					'authorization': apiKey,
					'user-hash': sessionStorage.getItem('userHash')
				},
				body: new FormData(e.target)
			})
			.then(response => {
				response.json().then(json => {
					if(json.success) {
						alert('Данные успешно обновлены!')
					}
				})
			})
			.catch(error => {
				alert('Ошибка сервера! Пожалуйста, попробуйте позже.')
			})
		}

		const deleteAddress = e => {
			fetch(apiUrl + '/api/v1/get/address?id=' + e.target.dataset.id, {
				method: 'get',
				mode: 'cors',
				headers: {
					'authorization': apiKey,
					'user-hash': sessionStorage.getItem('userHash')
				}
			})
			.then(response => {
				response.json().then(json => {
					if(json.success) {
						console.log('Jeje!')
						setAddressChanged(count => count + 1)
						console.log(addressChanged)
					}
				})
			})
			.catch(error => {
				alert('Ошибка сервера! Пожалуйста, попробуйте позже.')
			})
		}

		if(!userAuthorized) {
			return (
				<Redirect to='/auth/'/>
			)
		}
		else {
			if(error) {
				return <div>Error: {error.message}</div>
			}
			else if(!isLoaded) {
				return <div>Loading...</div>
			}
			else {
				return (
					<main>
						<section className='m-section'>
							<ProfileLinks/>
							<div id='l-personal'>
								<form id='l-personalInfo' onSubmit={editInfo}>
									<h2>+79224188882</h2>
									<article>
										<input type='text' name='UserForm[name]' placeholder='Имя' defaultValue='Сергей'/>
									</article>
									<article>
										<input type='email' name='UserForm[email]' placeholder='E-mail'/>
									</article>
									<article>
										<InputMask mask='99.99.9999' maskChar='_' alwaysShowMask='false'>
											{(inputProps) => <input type='text' name='UserForm[birthday]' placeholder='День рождения'/>}
										</InputMask>
									</article>
									<article>
										<p>Пол</p>
										<div className='m-radioInput'>
											<input type='radio' name='UserForm[gender]' value='m' id='male'/>
											<label htmlFor='male'>Мужской</label>
										</div>
										<div className='m-radioInput'>
											<input type='radio' name='UserForm[gender]' value='f' id='female'/>
											<label htmlFor='female'>Женский</label>
										</div>
									</article>
									<button type='submit'>Сохранить</button>
									<button type='button' onClick={logout}>Выйти</button>
								</form>
								<div id='l-personalAddresses'>
									<h3>Мои адреса</h3>
									<button className='m-linkButton' onClick={openModal}>Добавить адрес</button>
									<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
										<button className='m-linkButton m-closeModalButton' onClick={closeModal}>&#10006;</button>
										<h2>Добавить новый адрес</h2>
										<form id='l-modalAddressForm' onSubmit={addAddress}>
											<article>
												<input type='text' name='AddressForm[name]' placeholder='Название'/>
											</article>
											<article>
												<input type='text' name='AddressForm[address]' placeholder='Адрес'/>
											</article>
											<article>
												<input type='text' name='AddressForm[driveway]' placeholder='Подъезд'/>
											</article>
											<article>
												<input type='text' name='AddressForm[apartment]' placeholder='Квартира'/>
											</article>
											<article>
												<input type='text' name='AddressForm[intercom]' placeholder='Домофон'/>
											</article>
											<article>
												<input type='text' name='AddressForm[story]' placeholder='Этаж'/>
											</article>
											<button type='submit'>Сохранить</button>
										</form>
									</Modal>
									<article>
										<p><span>Дом: </span>Москва, 12-я Парковая улица, 6 12</p>
										<button className='m-linkButton' data-id='1' onClick={deleteAddress}>Удалить</button>
									</article>
									<article>
										<p><span>Работа: </span>Москва, 12-я Парковая улица, 6 12</p>
										<button className='m-linkButton' data-id='2' onClick={deleteAddress}>Удалить</button>
									</article>
								</div>
							</div>
						</section>
					</main>
				)
			}
		}
	}
	
	function Orders() {
		fetch(apiUrl + '/api/v1/get/orders?type=list', {
			method: 'get',
			mode: 'cors',
			headers: {
				'authorization': apiKey,
				'user-hash': sessionStorage.getItem('userHash')
			}
		})
		.then(response => {
			response.json().then(json => {
				if(json.success) {
					console.log(json)
				}
			})
		})
		.catch(error => {
			alert('Ошибка сервера! Пожалуйста, попробуйте позже.')
		})

		if(!userAuthorized) {
			return (
				<Redirect to='/auth/'/>
			)
		}
		else {
			return (
				<main>
					<section className='m-section'>
						<ProfileLinks/>
						<div id='l-personal'>
							<div id='l-personalOrders'>
								<h2>Список заказов пуст</h2>
								<article>
									<div>
										<span>Номер заказа</span>
										<p>1</p>
									</div>
									<div>
										<span>Дата заказа</span>
										<p>17.02.2021, 13:33:08</p>
									</div>
									<div>
										<span>Количество дней</span>
										<p>30 дней</p>
									</div>
									<div>
										<span>Сумма заказа</span>
										<p>20 000 руб</p>
									</div>
									<div>
										<span>Способ оплаты</span>
										<p>Картой курьеру</p>
									</div>
									<div>
										<span>Статус заказа</span>
										<p>Не оплачен</p>
									</div>
								</article>
								<article>
									<div>
										<span>Номер заказа</span>
										<p>1</p>
									</div>
									<div>
										<span>Дата заказа</span>
										<p>17.02.2021, 13:33:08</p>
									</div>
									<div>
										<span>Количество дней</span>
										<p>30 дней</p>
									</div>
									<div>
										<span>Сумма заказа</span>
										<p>20 000 руб</p>
									</div>
									<div>
										<span>Способ оплаты</span>
										<p>Картой курьеру</p>
									</div>
									<div>
										<span>Статус заказа</span>
										<p>Не оплачен</p>
									</div>
								</article>
							</div>
						</div>
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

	return (
		<Router>
			<Header/>
			<Switch>
				<Route path='/auth/'>
					<Auth/>
				</Route>
				<Route path='/profile/'>
					<Profile/>
				</Route>
				<Route path='/orders/'>
					<Orders/>
				</Route>
				<Route path='/basket/'>
					<Basket/>
				</Route>
				<Route path='/'>
					<Mainpage/>
				</Route>
			</Switch>
			<Footer/>
		</Router>
	)
}

