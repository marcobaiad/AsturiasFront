import React, { useRef } from 'react';
import Iframe from 'react-iframe';
import '../Css/footer.css';

const Footer = () => {

	const roleAdmin = localStorage.getItem('role')
	const recoverPass = window.location.pathname === "/recoverpass"

	return (
		<>
			{roleAdmin === 'admin' || recoverPass ?
				'' :
				<footer className="row justify-content-around  align-items-center mx-0 py-3 bg-dark text-white" id="AboutUs">
					<div>
						<h2 className="text-white h2-footer text-center">Asturias Food & Drink</h2>
						<div className="row mx-0 justify-content-center text-center text-md-left">
							<div id="Redes" className="my-4 col-12 col-md-6">
								<p className="p-redes">Nuestras Redes Sociales</p>
								<a href="https://www.facebook.com/RollingCodeSchool/" target="_blank" rel="noopener noreferrer"><i className="fab mx-2 fa-facebook"></i></a>
								<a href="https://twitter.com/rollingcodeok?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer"><i className="fab mx-2 fa-twitter-square"></i></a>
								<a href="https://web.whatsapp.com/"><i className="fab mx-2 fa-whatsapp"></i></a>
								<a href="https://www.instagram.com/rollingcodeschool/?hl=es-la" target="_blank" rel="noopener noreferrer"><i className="fab mx-2 fa-instagram"></i></a>
							</div>
							<div className="my-4 col-12 col-md-6">
								<p className="p-redes mb-0"><i className="fas fa-map-marker-alt"></i> Direccion: Gral. Paz 576</p>
								<p className="p-redes mb-0">Localidad: S. M. de Tucumán</p>
								<p className="p-redes mb-0"> CP: 4000 </p>
							</div>
						</div>
					</div>
					<div className="p-3 p-md-0">
						<Iframe className="mw-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.102370777529!2d-65.2093904854509!3d-26.836696096500635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1592508273252!5m2!1ses-419!2sar" width="500" height="300" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></Iframe>
					</div>
				</footer>
			}
		</>
	)
}

export default Footer;