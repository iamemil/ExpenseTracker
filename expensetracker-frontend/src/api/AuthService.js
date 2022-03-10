import axios from "axios";
import { API_URL } from "./constants";
export default class AuthService{

    signin(body){
        return axios.post(API_URL+"/Account/SignIn", body, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }});
    }

    register(body){
        return axios.post(API_URL+"/Account/Register", body);
    }
}