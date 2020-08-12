import axios from 'axios'

const clienteAxios = axios.create({
  // baseURL: 'http://asturiasrestorant.herokuapp.com'
  baseURL: 'http://localhost:3001'
});

export default clienteAxios;