import axios from 'axios'
// import { getEnvVariables } from '../helpers/getEnvVariables'

// const { API_URL } = getEnvVariables()

const bibliotecaApi = axios.create({
    baseURL: "http://localhost/biblioteca_vn_backend/public/api"
    // baseURL: "http://134.122.124.97/api"
})

bibliotecaApi.interceptors.request.use(config => {
    
    config.headers = {
        ...config.headers, 
        'Authorization' : localStorage.getItem('token')
    }
    
    return config
})

export default bibliotecaApi