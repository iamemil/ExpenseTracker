import axios from "axios";

export default class AccountService{

    signin(body){
        return axios.post("/Api/Account/SignIn", body);
    }

    register(body){
        return axios.post("/Api/Account/Register", body);
    }
}