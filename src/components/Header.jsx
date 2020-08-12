import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import '../Css/navbar.css';
import '../Css/Logo.css';
import auth from '../utils/auth';
import Carousel from 'react-bootstrap/Carousel';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Lampara from '../img/CarrouselNav/Lampara.jpg'
import Pizzas from '../img/CarrouselNav/Pizzas.jpg'
import Restorant from '../img/CarrouselNav/Restorant.jpg'
import ModalLogin from './ModalLogin';
import clienteAxios from '../config/axios';
import Logo from '../img/CarrouselNav/Logo.png';
import SobreNosotros from './SobreNosotros';


const Header = () => {
 

    const [isLogedIn, SetIsLogedIn] = useState(false);
    const [userName, SetUserName] = useState('');
    const history = useHistory();
    const pathHome = history.location.pathname === '/';
    const [modalShow, setModalShow] = useState(false);
    const [sobreShow, setSobreShow] = useState(false);
    const [navAltura, setNavAltura] = useState(0);
    const [carrouselAlt, setCarrouselAltura] = useState();


    const UserLogueado = async () => {
        try {
            if (localStorage.getItem('token')) {
                const usuario = await clienteAxios.get(`/api/v1/usuarios/${localStorage.getItem('id')}`);
                const username = localStorage.setItem('username', usuario.data.username);
                SetUserName(username)
            }
        } catch (error) {
            const { response } = error;
            console.log(response);
        }
    }
    
    const menuUser = useRef();

    const MoverMenuUser = () => {
        window.scrollTo(0, menuUser.current.offsetTop + 50)
    }

    const carrousel = (node => {
        if (node !== null) {
            setCarrouselAltura(node.clientHeight);
        }
    });

    const navbar = useRef();

    const alturaNav = () => {

        setNavAltura(navbar.current.offsetTop);

        if (pathHome) {
            if (window.pageYOffset >= navAltura) {
                navbar.current.classList.add("position-fixed");
                navbar.current.classList.remove("align-self-end");
            }
            if (carrouselAlt=== true) {
                console.log(true);
            }
            if (carrouselAlt) {
                if (window.pageYOffset <= carrouselAlt - (window.screen.width > 767 ? 80 : 160)) {
                    navbar.current.removeAttribute("class", "position-fixed");
                    navbar.current.classList.add("align-self-end");
                }
            }
        } else {
            navbar.current.setAttribute("class", "position-fixed");
        }
        
    }
      
    useEffect(()=> {
        if (auth.isAuthenticated) {
            UserLogueado();
        };
        alturaNav();
    }, [alturaNav, UserLogueado])

    window.onscroll = alturaNav

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

    const formSelect = useRef();
    
    const onchangeSelectHandler = (e) => {
        if (e.target.value === '/') {
            history.push(`${e.target.value}`) 
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
        const select = formSelect.current
        setTimeout(() => select.selectedIndex = 0, 1000)
        
    }

    const roleAdmin = localStorage.getItem('role');
    
    return (
        <div className="d-flex flex-wrap">
            {pathHome &&
                <>
                    <div className="col-12 row mx-0 pr-3 pr-md-5 justify-content-end">
                        <img src={Logo} className='logo mt-5' alt="Logo Asturias" />
                    </div>
                    <div ref={carrousel}>
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
                    </div>
                </>
            }
            <div className="position-absolute align-self-end" ref={navbar} id="navbar">
                {roleAdmin === 'admin' ?
                    '' 
                    :
                    <Navbar variant="dark" className="px-0 py-2 mb-3 mb-lg-4 navbar-menu row flex-wrap justify-content-center justify-content-md-between m-0">
                        <Nav className="d-none d-sm-none d-md-flex d-lg-flex row pl-5 order-2 order-md-1">
                            <Navbar.Brand className="d-none d-lg-block ml-3">Asturias Food & Drinks</Navbar.Brand>
                            <Link className="text-white hover-navbar mt-2 mx-1" to="/">INICIO</Link>
                            <Link className="text-white hover-navbar mt-2 mx-1" to="/" onClick={Timeout}>MENU</Link>
                            <Link className="text-white hover-navbar mt-2 mx-1" to="" onClick={MoverContacto}>CONTACTO</Link>
                            <Link className="text-white hover-navbar mt-2 mx-1"	to="#AboutUs" onClick={() => setSobreShow(true)}>SOBRE NOSOTROS</Link>
                            <SobreNosotros show={sobreShow} onHide={() => setSobreShow(false)} />
                        </Nav>
                        <Nav className="row mx-2 order-1 order-md-2 flex-nowrap">
                            {auth.isAuthenticated() ?
                                <>   
                                    <label className="mt-2 text-white hover-navbar dropdown-toggle" onClick={MoverMenuUser} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="far fa-user-circle"></i> {userName ? userName : localStorage.getItem('username')}
                                    </label>
                                    <div className="dropdown">
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <Link className="dropdown-item text-white hover-navbar" to="/user/orders"><i className="far fa-clipboard"></i> Mis Pedidos</Link>
                                            <Link className="dropdown-item text-white hover-navbar" ref={menuUser} to={`/user/perfil/${localStorage.getItem('id')}`}><i className="far fa-user"></i> Mis datos</Link>
                                        </div>
                                    </div>
                                    <Nav.Link className="text-white hover-navbar" onClick={LogUotHandler}> <i className="fas fa-sign-out-alt"></i> SALIR</Nav.Link>
                                </>
                                :
                                <>
                                    <Link className="text-white hover-navbar mx-2" to="/reg">REGISTRO</Link>
                                    <Link className="text-white hover-navbar mx-2" to="" onClick={() => setModalShow(true)} id="Log-Modal"><i className="far fa-user"></i> INICIAR SESIÓN</Link>
                                    <ModalLogin
                                        className="position-absolute"
                                        show={modalShow}                                        
                                        onHide={() => setModalShow(false)}
                                    />
                                </>
                            }
                        </Nav>
                        <Form className="w-100 px-3 d-md-none mt-3 mb-0">
                            <Form.Group>
                                <Form.Control onChange={onchangeSelectHandler} defaultValue={0} ref={formSelect} className="drop-menu text-white" as="select" custom>
                                    <option disabled>IR A...</option>
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
