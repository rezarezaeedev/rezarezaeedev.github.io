import axios from 'axios';

const instance = axios.create({
    baseURL:'https://rezarezaeedev.pythonanywhere.com',
    timeout:5000
})

export default instance
