import { configDotenv } from "dotenv";
import axios from 'axios';


const API_URL = process.env.API_URL;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
