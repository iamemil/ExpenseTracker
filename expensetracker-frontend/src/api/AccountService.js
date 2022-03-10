import axios from "axios";
import { API_URL } from "./constants";
import secureLs from "../common/helper";
export default class AccountService{

    getAccountDetails(){
        let config = {
            headers : {
                Authorization : secureLs.get("Authorization")
            }
        }
        return axios.get(API_URL+"/Account/getAccountDetails", config);
    }
}

