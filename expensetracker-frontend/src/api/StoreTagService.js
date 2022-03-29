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
        return axios.post(API_URL+"/StoreTags/GetStoreTags","withPublicTags="+withPublicTags, config);
    }

    createStoreTag(tagName){
        let config = {
            headers : {
                Authorization : secureLs.get("Authorization")
            },
        }
        return axios.post(API_URL+"/StoreTags/Create",tagName, config);
    }

    editStoreTag(Id,tagName){
        let config = {
            headers : {
                Authorization : secureLs.get("Authorization")
            },
        }
        return axios.post(API_URL+"/StoreTags/Edit",{Id,tagName}, config);
    }

    deleteStoreTag(Id){
        let config = {
            headers : {
                Authorization : secureLs.get("Authorization")
            },
        }
        return axios.post(API_URL+"/StoreTags/Delete",{Id}, config);
    }
}