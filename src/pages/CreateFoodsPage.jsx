import React, { useState, useRef, } from 'react'
import { useHistory } from 'react-router-dom';
import '../Css/CreateFoodsPage.css';
import clienteAxios from '../config/axios';

function CreateFoodsPage() {
	const history = useHistory()
	const wrapperRef = useRef(null)
	const [createFoods, setCreateFoods] = useState()
	const [previewImage, setPreviewImage] = useState('')
	const [image, setImage] = useState(null)
	console.log(createFoods)

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			if (image !== null) {
				const newFoods = await clienteAxios.post('/api/v1/comidas', createFoods, {
					
				})
				console.log(newFoods)
				const formData = new FormData()
				formData.append('file', image)
				await clienteAxios.post(`/api/v1/comidas/${newFoods.data._id}/upload`, formData, {
					headers: {						
						'content-type': 'multipart/form-data'

					}
				})
			}
			window.location = '/';
		} catch (error) {
			console.log(error)
		}
	}

	const handleChange = (e) => {
		setCreateFoods({ ...createFoods, [e.target.name]: e.target.value })
	}

	const validateupload = e =>
		e.target.files[0].type == 'image/png' ||
		e.target.files[0].type == 'image/jpg' ||
		e.target.files[0].type == 'image/jpeg'


	const upload = e => {
		if (e.target.files[0].size <= 20000000) {
			let file = e.target.files[0];
			let reader = new FileReader()
			reader.onload = function (e) {
				setPreviewImage(e.target.result)
			}
			reader.readAsDataURL(file)
		} else {
			e.target.value = ''
			alert('subir algo min 2 mb')
		}
	}

	return (

		<div className='pb-5 mb-5'>
			<div className='text-center py-5'>
				<h1>Create Foods Page</h1>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-md-6 PrimeraCol col-12">
						<div className='d-flex justify-content-center'>
							<form onSubmit={handleSubmit}>
							 <div className='row justify-content-center PrimerRow'>
                  <div className='mr-3 Columnas'>
								<div className="form-group">
									<label htmlFor="exampleInputEmail1">Titulo</label>
									<input type="text" name='title' className="form-control FormGroup"
										id="exampleInputEmail1" aria-describedby="emailHelp"
										onChange={handleChange} />
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputPassword1">Descripción</label>
									<input type="text" name='description' className="form-control FormGroup"
										id="exampleInputPassword1" onChange={handleChange} />
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputPassword1">Detalles</label>
									<input type="text" name='summary' className="form-control FormGroup"
										id="exampleInputPassword1" onChange={handleChange} />
								</div>
								</div>
								<div className='ml-3 Columnas'>
								<div className="form-group">
									<label htmlFor="exampleInputPassword1">Precio</label>
									<input type="text" name='price' className="form-control FormGroup"
										id="exampleInputPassword1" onChange={handleChange} />
								</div>
								<div className="form-group">
									<label for="inputState">Categoría</label>
									<select id="inputState" className="form-control FormGroup"
										name='category' onChange={handleChange} required>
										<option value=''>Seleccione Una Categoría...</option>
										<option >Desayuno</option>
										<option>Almuerzo</option>
										<option>Merienda</option>
										<option>Cena</option>
										<option>Tragos</option>
									</select>
								</div>
								</div>
								</div>
								<div className='pt-3'>
									<button type="submit" className="btn btn-outline-primary w-100">Publicar</button>
								</div>
							</form>
						</div>
					</div>
					<div className="col col-6">
						<div  >
							<form>
								<div className="form-group d-none">
									<input
										type="file"
										className="form-control-file"
										name='file'
										onChange={e => {
											setImage(e.target.files[0])
											let file = e.target.files
											if (file.length === 1 && validateupload(e)) {
												upload(e)
											} else {
												e.target.value = ''
												alert('cargar imagen')
											}
										}}
										ref={wrapperRef}
										accept="image/gif, image/jpg, image/png"
									/>
								</div>
								<div className='border border-dark' style={{ cursor: 'pointer' }} onClick={() => {
									wrapperRef.current.click()
								}}>
									<img src={previewImage} className='previewImagen' alt="" />
								</div>
								<input type="text" placeholder='Subir Imagen'
									className=' border-0 borderInputImg' readOnly />
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateFoodsPage;
