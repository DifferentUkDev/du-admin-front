import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://109.248.11.164:5000',
});