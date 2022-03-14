import axios from "axios";
import { API_URL } from "./constants";
import secureLs from "../common/helper";
export default class StoreTagService{

    getStoreTags(withPublicTags){
        let config = {
            headers : {
                Authorization : secureLs.get("Authorization")
            },
        }
        return axios.post(API_URL+"/StoreTag/GetStoreTags","withPublicTags="+withPublicTags, config);
    }
}