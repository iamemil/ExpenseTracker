import axios from "axios";
import { API_URL } from "./constants";
export default class AuthService{

    signin(body){
        return axios.post(API_URL+"/Account/SignIn", body);
    }

    register(body){
        return axios.post(API_URL+"/Account/Register", body);
    }
}