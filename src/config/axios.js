import axios from 'axios'

const clienteAxios = axios.create({
  baseURL: 'https://asturiasrestorant.herokuapp.com'
});

export default clienteAxios;