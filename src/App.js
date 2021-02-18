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
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import './App.css'

const apiKey = '3c0d4811f72089fdd67d6ec69ad06889fb03b88a'
const apiUrl = 'https://api.musi4s.website'

Modal.setAppElement('#root')

const reviewBreakpoints = {
	320: {
		slidesPerView: 1.5,
		spaceBetween: 20
	},
	768: {
		slidesPerView: 4,
		spaceBetween: 20
	}
}

const catalogBreakpoints = {
	320: {
		slidesPerView: 1.5,
		spaceBetween: 30
	},
	768: {
		slidesPerView: 3.5,
		spaceBetween: 30
	}
}

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
	
	const callMe = e => {
		e.preventDefault()

		fetch(apiUrl + '/api/v1/post/requests', {
			method: 'post',
			mode: 'cors',
			headers: {
				'authorization': apiKey
			},
			body: new FormData(e.target)
		})
		.then(response => {
			response.json().then(json => {
				if(json.success) {
					alert('Заявка отправлена!')
				}
			})
		})
		.catch(error => {
			alert('Ошибка сервера! Пожалуйста, попробуйте позже.')
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
								<Modal isOpen={modalIsOpen} onRequestClose={closeModal} overlayClassName='m-modalOverlay' className='m-modal'>
									<button className='m-linkButton m-closeModalButton' onClick={closeModal}>&#10006;</button>
									<h2>Заказать обратный звонок</h2>
									<form id='l-modalCallback' onSubmit={callMe}>
										<input type='hidden' name='RequestForm[type]' value='callback'/>
										<article>
											<input type='text' name='RequestForm[name]' placeholder='Имя'/>
										</article>
										<article>
											<InputMask mask='+7 (999) 999-9999' maskChar='_' alwaysShowMask='true'>
												{(inputProps) => <input type='tel' name='RequestForm[phone]'/>}
											</InputMask>
										</article>
										<article>
											<div className='m-checkboxInput'>
												<input type='checkbox' name='RequestForm[agreement]' id='agreement' checked/>
												<label htmlFor='agreement'>
													<a href='/docs/doc.pdf' target='_blank'>Политика конфиденциальности</a>
												</label>
											</div>
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

	function AccordeonItem(props) {
		const [open, setOpen] = useState('s-closed')
		const [minus, setminus] = useState('m-plus')

		const openDesc = () => {
			if(open === 's-closed') {
				setOpen('s-opened')
				setminus('m-minus')
			}
			else {
				setOpen('s-closed')
				setminus('m-plus')
			}
		}

		return (
			<div className='m-accordeonItem'>
				<button onClick={openDesc}>
					{props.name}
					<span className={minus}>
						<img src='/img/minus.svg'/>
						<img src='/img/minus.svg'/>
					</span>
				</button>
				<article className={open}>{props.desc}</article>
			</div>
		)
	}

	function HiddenText(props) {
		const [open, setOpen] = useState('s-closed')
		const [text, setText] = useState('Подробнее')

		const openText = () => {
			if(open === 's-closed') {
				setOpen('s-opened')
				setText('Свернуть')
			}
			else {
				setOpen('s-closed')
				setText('Подробнее')
			}
		}

		return (
			<div>
				<div className={open}>{props.text}</div>
				<button className='m-linkButton' onClick={openText}>{text}</button>
			</div>
		)
	}

	function Catalog() {
		return (
			<div id='l-catalog'>
				<div className='m-catalogBlock'>
					<h3>Выберите размер рациона:</h3>
					<div className='m-catalogButtons'>
						<button>XS</button>
						<button className='active'>S</button>
					</div>
				</div>
				<div className='m-catalogBlock'>
					<h3>Примерное меню на неделю:</h3>
					<div className='m-catalogButtons'>
						<button className='active'><span>Понедельник</span><span>Пн</span></button>
						<button><span>Вторник</span><span>Вт</span></button>
					</div>
					<div id='l-catalogSlider'>
						<Swiper breakpoints={catalogBreakpoints}>
							<SwiperSlide>
								<img src="/img/catalog.png"/>
								<span>Каша</span>
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
				<div className='m-catalogBlock'>
					<div id='l-catalogDuration'>
						<h3>Выберите продолжительность:</h3>
						<div className='m-selectWindow'>
							<span>3 дня: 700р в день</span>
							<span>5 дней: 700р в день</span>
						</div>
						<button className='m-selectButton'>3 дня: 700р в день</button>
					</div>
					<div id='l-catalogPrice'>
						<h3>Итого:</h3>
						<p>16 500р</p>
					</div>
					<div id='l-catalogPurchase'>
						<button>Заказать</button>
					</div>
				</div>
			</div>
		)
	}
	
	function Mainpage() {
		const [modalIsOpen, setIsOpen] = useState(false)

		const openModal = () => {
			setIsOpen(true)
		}

		const closeModal = () => {
			setIsOpen(false)
		}
		
		return (
			<main>
				<section id='l-banner' className='m-section'>
					<h1>Готовим и доставляем еду на целый день</h1>
					<ul>
						<li>
							<span>Разнообразнее, чем готовить самому<span>Меню не повторяется месяц</span></span>
						</li>
						<li>
							<span>Дешевле, чем питаться в кафе<span>6 блюд за 550р в день</span></span>
						</li>
						<li>
							<span>Полезнее, чем заказать пиццу<span>Полноценное питание</span></span>
						</li>
					</ul>
					<button onClick={openModal}>Расскажите мне все</button>
					<Modal isOpen={modalIsOpen} onRequestClose={closeModal} overlayClassName='m-modalOverlay' className='m-modal'>
						<button className='m-linkButton m-closeModalButton' onClick={closeModal}>&#10006;</button>
						<h2>Заказать обратный звонок</h2>
						<form id='l-modalCallback' onSubmit={callMe}>
							<input type='hidden' name='RequestForm[type]' value='callback'/>
							<article>
								<input type='text' name='RequestForm[name]' placeholder='Имя'/>
							</article>
							<article>
								<InputMask mask='+7 (999) 999-9999' maskChar='_' alwaysShowMask='true'>
									{(inputProps) => <input type='tel' name='RequestForm[phone]'/>}
								</InputMask>
							</article>
							<article>
								<div className='m-checkboxInput'>
									<input type='checkbox' name='RequestForm[agreement]' id='agreement' checked/>
									<label htmlFor='agreement'>
										<a href='/docs/doc.pdf' target='_blank'>Политика конфиденциальности</a>
									</label>
								</div>
							</article>
							<button type='submit'>Отправить</button>
						</form>
					</Modal>
				</section>
				<section className='m-section t-darkBackground'>
					<div className='m-slider t-staticSlider'>
						<article>
							<img src='/img/time-passing.svg'/>
							<h3>Получите 25-ый час</h3>
							<hr/>
							<p>Экономьте время на готовке еды, мытье посуды и походах в магазин, и занимайтесь полезными или любимыми делами.</p>
						</article>
						<article>
							<img src='/img/container.svg'/>
							<h3>Питайтесь, где удобно</h3>
							<hr/>
							<p>Блюда герметично упакованы в контейнеры, которые можно брать с собой на работу или учебу.</p>
						</article>
						<article>
							<img src='/img/cook-book.svg'/>
							<h3>Наслаждайтесь едой</h3>
							<hr/>
							<p>Шеф-повар тщательно следит за тем, чтобы блюда вам нравились. Мы убираем из рационов блюда, если они получают от вас низкие оценки.</p>
						</article>
					</div>
					<div className='m-slider t-dynamicSlider'>
						<Swiper spaceBetween={50} slidesPerView={1.5}>
							<SwiperSlide>
								<article>
									<img src='/img/time-passing.svg'/>
									<h3>Получите 25-ый час</h3>
									<hr/>
									<p>Экономьте время на готовке еды, мытье посуды и походах в магазин, и занимайтесь полезными или любимыми делами.</p>
								</article>
							</SwiperSlide>
							<SwiperSlide>
								<article>
									<img src='/img/container.svg'/>
									<h3>Питайтесь, где удобно</h3>
									<hr/>
									<p>Блюда герметично упакованы в контейнеры, которые можно брать с собой на работу или учебу.</p>
								</article>
							</SwiperSlide>
							<SwiperSlide>
								<article>
									<img src='/img/cook-book.svg'/>
									<h3>Наслаждайтесь едой</h3>
									<hr/>
									<p>Шеф-повар тщательно следит за тем, чтобы блюда вам нравились. Мы убираем из рационов блюда, если они получают от вас низкие оценки.</p>
								</article>
							</SwiperSlide>
						</Swiper>
					</div>
				</section>
				<section className='m-section'>
					<Catalog/>
				</section>
				<section className='t-grey m-section'>
					<div className='m-twoColumns'>
						<article>
							<h2>Где мы готовим?</h2>
							<p>Все блюда мы готовим на собственном производстве с использованием новейшего и современного оборудования.</p>
						</article>
						<article>
							<img src='/img/cook.jpg'/>
						</article>
					</div>
				</section>
				<section className='m-section t-darkBackground'>
					<h2>Оплата и доставка</h2>
					<div className='m-slider t-staticSlider'>
						<article>
							<img src='/img/delivery-guy.svg'/>
							<h3>График доставки</h3>
							<hr/>
							<p>Вы будете получать блюда в удобный вам двухчасовой интервал с 6:00 до 12:00 в течение всего периода подписки раз в 3 дня (по линейке Classic) или раз в 2 дня (по линейке Platinum). Или по 5-ти и 20-ти дневным программам только по будням в ПН и ЧТ (Classic) или ПН, СР, ПТ (Platinum).</p>
						</article>
						<article>
							<img src='/img/schedule.svg'/>
							<h3>«Дни заморозки»</h3>
							<hr/>
							<p>При заказе любой нашей линейки от 12 дней вы получите так называемые «дни заморозки», с помощью которых вы сможете пропустить, например, доставку рациона на выходные. По 20-ти дневной программе заморозка возможна только по неделям.</p>
						</article>
						<article>
							<img src='/img/cash.svg'/>
							<h3>Способы оплаты</h3>
							<hr/>
							<p>Оплачивайте любым удобным вам способом: онлайн на сайте или наличными курьеру.</p>
						</article>
					</div>
					<div className='m-slider t-dynamicSlider'>
						<Swiper spaceBetween={50} slidesPerView={1.5}>
							<SwiperSlide>
								<article>
									<img src='/img/delivery-guy.svg'/>
									<h3>График доставки</h3>
									<hr/>
									<p>Вы будете получать блюда в удобный вам двухчасовой интервал с 6:00 до 12:00 в течение всего периода подписки раз в 3 дня (по линейке Classic) или раз в 2 дня (по линейке Platinum). Или по 5-ти и 20-ти дневным программам только по будням в ПН и ЧТ (Classic) или ПН, СР, ПТ (Platinum).</p>
								</article>
							</SwiperSlide>
							<SwiperSlide>
								<article>
									<img src='/img/schedule.svg'/>
									<h3>«Дни заморозки»</h3>
									<hr/>
									<p>При заказе любой нашей линейки от 12 дней вы получите так называемые «дни заморозки», с помощью которых вы сможете пропустить, например, доставку рациона на выходные. По 20-ти дневной программе заморозка возможна только по неделям.</p>
								</article>
							</SwiperSlide>
							<SwiperSlide>
								<article>
									<img src='/img/cash.svg'/>
									<h3>Способы оплаты</h3>
									<hr/>
									<p>Оплачивайте любым удобным вам способом: онлайн на сайте или наличными курьеру.</p>
								</article>
							</SwiperSlide>
						</Swiper>
					</div>
				</section>
				<section className='t-grey m-section'>
					<div className='m-twoColumns'>
						<article>
							<h2>Частые вопросы</h2>
							<p>Если вы не нашли ответа на ваш вопрос, наши менеджеры с радостью вам помогут</p>
							<p>Остались вопросы?</p>
							<button onClick={openModal}>Расскажите мне все</button>
						</article>
						<article>
							<AccordeonItem name='Где вы это всё готовите?' desc='Все блюда мы готовим на собственных производствах'/>
							<AccordeonItem name='Где вы это всё готовите?' desc='Все блюда мы готовим на собственных производствах'/>
						</article>
					</div>
				</section>
				<section className='m-section'>
					<h2>Отзывы</h2>
					<Swiper breakpoints={reviewBreakpoints}>
						<SwiperSlide>
							<img src='/img/review.jpg'/>
						</SwiperSlide>
						<SwiperSlide>
							<img src='/img/review.jpg'/>
						</SwiperSlide>
						<SwiperSlide>
							<img src='/img/review.jpg'/>
						</SwiperSlide>
						<SwiperSlide>
							<img src='/img/review.jpg'/>
						</SwiperSlide>
						<SwiperSlide>
							<img src='/img/review.jpg'/>
						</SwiperSlide>
					</Swiper>
				</section>
				<section className='t-grey m-section'>
					<div id='l-subscribe'>
						<article>
							<h2>Подпишитесь на наши соцсети</h2>
							<p>Чтобы своевременно получать информацию о новых блюдах, акциях, конкурсах и мероприятиях.</p>
						</article>
						<article>
							<a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
								<img src='/img/instagram.svg' alt='instagram'/>
							</a>
							<a href='https://vk.com/' target='_blank' rel='noreferrer'>
								<img src='/img/vk.svg' alt='vkontakte'/>
							</a>
							<a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
								<img src='/img/fb.svg' alt='facebook'/>
							</a>
						</article>
					</div>
				</section>
				<section id='l-about' className='m-section'>
					<h3>Знакомьтесь, My Food – один из лучших сервисов доставки еды в Москве, Санкт-Петербурге, Екатеринбурге, Краснодаре, Ростове-на-Дону, Челябинске, Калуге, Рязани, Ярославле, Владимире, Туле и Твери</h3>
					<p>Мы работаем в Москве, Санкт-Петербурге, Екатеринбурге, Краснодаре, Ростове-на-Дону, Челябинске, Калуге, Рязани, Ярославле, Владимире, Туле и Твери. В каждом городе у нас собственное производство. Цель нашей компании — обеспечить вас готовой и вкусной едой на каждый день. Больше не нужно самостоятельно решать, какие блюда приготовить на завтрак, обед и ужин и что взять на работу. Мы сами доставим вкусную готовую еду на дом в удобное утреннее время и место. Вам необходимо только выбрать подходящий рацион и указать адрес доставки. На нашем сайте вы найдете 2 линейки с программами — Classic (во всех городах) и Platinum (только Москва и Санкт-Петербург).</p>
					<HiddenText text='Some text'/>
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
				return (
					<main>
						<section className='m-section'>
							<h2>Error: {error.message}</h2>
						</section>
					</main>
				)
			}
			else if(!isLoaded) {
				return (
					<main>
						<section className='m-section'>
							<h2>Loading...</h2>
						</section>
					</main>
				)
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
									<Modal isOpen={modalIsOpen} onRequestClose={closeModal} overlayClassName='m-modalOverlay' className='m-modal'>
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

