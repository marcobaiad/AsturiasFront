import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import '../Css/navbar.css';
import '../Css/Logo.css'
import auth from '../utils/auth';
import Carousel from 'react-bootstrap/Carousel';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Sweet from 'sweetalert2';
import Lampara from '../img/CarrouselNav/Lampara.jpg'
import Pizzas from '../img/CarrouselNav/Pizzas.jpg'
import Restorant from '../img/CarrouselNav/Restorant.jpg'
import ModalLogin from './ModalLogin';
import clienteAxios from '../config/axios';
import Logo from '../img/CarrouselNav/Logo.png';
import SobreNosotros from './SobreNosotros'


const Header = () => {

    

    const [isLogedIn, SetIsLogedIn] = useState(false);
    const history = useHistory();
    const pathHome = history.location.pathname === '/';
		const [modalShow, setModalShow] = useState(false);
		const [sobreShow, setSobreShow] = useState(false);

    const StickyNav = () => {
        const navbar = document.getElementById("navbar");
        const carrousel = document.getElementById("carrousel");
        const positionNav = navbar.offsetTop;
        if (window.pageYOffset >= positionNav) {
            navbar.classList.add("position-fixed");
            navbar.classList.remove("align-self-end");
        }
        if (carrousel) {
            if (window.pageYOffset <= carrousel.clientHeight - (window.screen.width > 767 ? 80 : 160)) {
                navbar.classList.remove("position-fixed");
                navbar.classList.add("align-self-end");
            }
        }
    }

    window.onscroll = StickyNav


    const LogUotHandler = async () => {
        try {
					await clienteAxios.get(`/api/v1/usuarios/logout`);
					SetIsLogedIn(true);
					auth.logOut();
					window.location = '/';
        } catch (e) {
					const { response } = e;
					if (response.data.error & response.data.error.includes('expired')) {
							console.log('La sesión finalizó');
					}
        }
    }


    const MoverContacto = () => {
        const MenuContacto = document.getElementById("AboutUs");
        window.scrollTo(0, MenuContacto.offsetTop)
    }
    const MoverMenuComida = () => {
        const MenuComida = document.getElementById("Menu");
        window.scrollTo(0, MenuComida.offsetTop)
    }
    const Timeout = () => {
        setTimeout(MoverMenuComida, 100);
    }

		const ModalSobre = () => setSobreShow(true);

    const onchangeSelectHandler = (e) => {
			if (!pathHome && e.target.value === '/') {
				window.location.href=e.target.value
			}
			if (e.target.value === '#SobreNosotros') {
				ModalSobre();
			}
			if (pathHome && e.target.value === '#Menu') {            
				MoverMenuComida();
			}
			if (!pathHome && e.target.value === '#Menu') {
				history.push(`/${e.target.value}`);            
				Timeout();
			}
			if (e.target.value === '#AboutUs') {
				MoverContacto();
			}
    }

    const roleAdmin = localStorage.getItem('role')

    return (
        <div className="d-flex flex-wrap">
            {pathHome &&
            <>
                <div className="col-12 row mx-0 pr-3 pr-md-5 justify-content-end">
                    <img src={Logo} className='logo mt-5' />
                </div>
                <Carousel controls={false} indicators={false} id="carrousel">
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-md-100 h-lg-100 carrousel-img"
                            src={Restorant}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-md-100 h-lg-100 carrousel-img"
                            src={Lampara}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-md-100 h-lg-100 carrousel-img"
                            src={Pizzas}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </>
            }
            <div className="w-100 position-absolute align-self-end" id="navbar">
                {roleAdmin === 'admin' ?
                    '' :
                <Navbar variant="dark" className="px-0 py-2 mb-3 mb-lg-4 navbar-menu row flex-wrap justify-content-center justify-content-md-between m-0">
                    <Nav className="d-none d-sm-none d-md-flex d-lg-flex row pl-5 order-2 order-md-1">
                        <Navbar.Brand className="d-none d-lg-block ml-3">Asturias Food & Drinks</Navbar.Brand>
                        <Nav.Link className="text-white hover-navbar" href="/">INICIO</Nav.Link>
                        <Link className="text-white hover-navbar mt-2 mx-1" to="/" onClick={Timeout}>MENU</Link>
                        <Link className="text-white hover-navbar mt-2 mx-1" onClick={MoverContacto}>CONTACTO</Link>
                        <Link className="text-white hover-navbar mt-2 mx-1"	to="#AboutUs" onClick={() => setSobreShow(true)} >
													SOBRE NOSOTROS
            	 					</Link>
												<SobreNosotros show={sobreShow} onHide={() => setSobreShow(false)} />
                    </Nav>
                    <Nav className="row mx-3 order-1 order-md-2">
                        {auth.isAuthenticated() ?
                            <>
                            <Link className="text-white hover-navbar mt-2" to='/user/orders'> MIS PEDIDOS</Link>                            
                            <Nav.Link className="text-white hover-navbar" onClick={LogUotHandler}><i className="far fa-user"></i> CERRAR SESIÓN</Nav.Link>
                            </>
                            :
                            <>
                                <Link className="text-white hover-navbar mx-2" to="/reg">REGISTRO</Link>
                                <Link className="text-white hover-navbar mx-2" onClick={() => setModalShow(true)} id="Log-Modal"><i className="far fa-user"></i> INICIAR SESIÓN</Link>
                                <ModalLogin
                                    className="position-absolute"
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </>
                        }
                    </Nav>
                    <Form className="w-100 px-3 d-md-none mt-3 mb-0">
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Control onChange={onchangeSelectHandler} className="drop-menu text-white" as="select" custom>
                                <option value="" disabled selected>IR A...</option>
                                <option value="/">INICIO</option>
                                <option value="#Menu">MENU</option>
                                <option value="#AboutUs">CONTACTO</option>
                                <option value="#SobreNosotros">SOBRE NOSOTROS</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Navbar>
            }
            </div>
        </div>
    )
}

export default Header;
