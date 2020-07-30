import React from 'react';
import Modal from 'react-bootstrap/Modal'

const SobreNosotros = (props) => {
  return (
    <Modal className="position-absolute"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <h1 className='titulomodal'>Nuestra historia</h1>
      <Modal.Body closeButton>
        <h4 className='titulomodal pt-0'>Asturias Bar</h4>
        <p className="text-white">
          Durante mas de 50 años, en Asturias hemos hecho las cosas a nuestro modo. Desde el mismo comienzo, nos hemos opuesto a comprometer la calidad por tomar atajos y pensar en las ganancias antes de la excelencia. Nos mantenemos fieles a las prácticas tradicionales, respetadas desde tiempos inmemoriales y que nos fueran establecidas hace cinco generaciones: aún cortamos a mano nuestras carnes y aún utilizamos los ingredientes más exquisitos en nuestros productos. Es este tipo de compromiso el que nos ha convertido en el líder de nuestro sector y ha afianzado a Asturias como marca de confianza permanente de los consumidores.
        </p>
      </Modal.Body>
      {/* <button onClick={props.onHide}>x</button> */}
    </Modal>
  );
}

export default SobreNosotros;