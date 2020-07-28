import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import '../Css/CreateFoodsPage.css'
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

const Editfoods = () => {
  const history = useHistory()
  const params = useParams()
  const wrapperRef = useRef(null)
    const [createFoods, setCreateFoods] = useState({
    title: '',
    description: '',
    summary: '',
    price: '',
    category: '',
    enable: false
  })
  const { title, description, summary, price, category, enable } = createFoods
  const [previewImage, setPreviewImage] = useState('')
  const [image, setImage] = useState(null)

  const getFood = useCallback(async () => {
    const res = await clienteAxios.get(`api/v1/comidas/${params.id}`)
    setCreateFoods(res.data)
    setPreviewImage(res.data.imageUrl)
    setImage(res.data.imageUrl)
  }, [params.id])

  useEffect(() => {
    getFood()
  }, [getFood])

  const handleChange = (e) => {
    setCreateFoods({ ...createFoods, [e.target.name]: e.target.value })
  }

  const selectHandlerChange = (e) => {
    const value = e.target.value === 'true';
    const isEnable = enable === 'true'

    isEnable ? Swal.fire({
      title: 'Esta Seguro de Deshabilitar esta Comida del Menu?',
      text: "Deshabiltiar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Deshabilitar!'

    }).then((result) => {
      if (result.value) {

        Swal.fire(
          setCreateFoods({ ...createFoods, enable: value }),
          'Se ha Deshabilitado!',
          'Confirmado.',
          'success'
        )
      }
    })

      :

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

  const onClickUpdateHandler = async (e) => {
    e.preventDefault()
    try {
      await clienteAxios.put(`api/v1/comidas/${params.id}`, {
        title, description, summary, price, category, enable
      }
      )
      if (previewImage !== image) {

        const formData = new FormData()
        formData.append('file', image)
        await clienteAxios.post(`/api/v1/comidas/${params.id}/upload`, formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
      }

      history.goBack();
    }
    catch {
      console.log('NO SE PUDO ACTUALIZAR');
    }
  };

  return (
    <div className='pb-5 mb-5'>
      <div className='text-center py-5'>
        <h1>Pagina para editar comidas</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 PrimeraCol col-12 justify-content-center">
            <div className='d-flex justify-content-center'>
              <form onSubmit={onClickUpdateHandler}>
                <div className='row justify-content-center PrimerRow'>
                  <div className='mr-3 Columnas'>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Titulo</label>
                  <input
                    type="text"
                    name='title'
                    value={title}
                    className="form-control FormGroup"
                    id="exampleInputEmail1" aria-describedby="emailHelp"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Descripción</label>
                  <input
                    type="text"
                    name='description'
                    value={description}
                    className="form-control FormGroup"
                    id="exampleInputPassword1"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Detalles</label>
                  <input
                    type="text"
                    name='summary'
                    value={summary}
                    className="form-control FormGroup"
                    id="exampleInputPassword1"
                    onChange={handleChange}
                  />
                </div>
                </div>
                <div className='ml-3 Columnas'>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Precio</label>
                  <input
                    type="text"
                    name='price'
                    value={price}
                    className="form-control FormGroup"
                    id="exampleInputPassword1"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Categoria</label>
                  <input
                    type="text"
                    name='category'
                    value={category}
                    className="form-control FormGroup"
                    id="exampleInputPassword1"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label for="inputState">Estado</label>
                  <select id="inputState" className="form-control FormGroup"
                    name='enable' value={enable} onChange={selectHandlerChange} required>
                    <option value={true}>Habilitar</option>
                    <option value={false}>Deshabilitar</option>
                  </select>
                </div>
                </div>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-outline-primary w-100"
                >Editar
                </button>
              </form>
            </div>
          </div>
          <div className="col col-12 col-md-6">
            <div className="w-100">
              <form>
                <div className="form-group d-none">
                  <input
                    type="file"
                    className="form-control-file"
                    name='file'
                    /* value={file} */
                    onChange={(e) => {
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
                    accept='image/gif, image/jpg, image/png'
                  />
                </div>
                <div className='border border-dark' onClick={() => {
                  wrapperRef.current.click()
                }}>
                  <img src={previewImage} className='previewImagen' alt="" />
                  <input type="text" placeholder='Subir Imagen'
                    className=' border-0 borderInputImg' readOnly />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editfoods;