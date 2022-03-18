import axios from "axios";
import { API_URL } from "./constants";
import secureLs from "../common/helper";
export default class ItemService {

    getUserReceiptItems(){
        let config = {
            headers : {
                Authorization : secureLs.get("Authorization"),
            }
        }
        return axios.post(API_URL+"/Items/GetUserReceiptItems",null,config);
    }

}
