import axios from "axios";
import { API_URL } from "./constants";
import secureLs from "../common/helper";
export default class StatisticsService {


    getChartStatistics(year){
        let config = {
            headers : {
                Authorization : secureLs.get("Authorization"),
            }
        }
        return axios.post(API_URL+"/Statistics/GetChartStatistics","year="+year,config);
    }

    getTotalStatistics(){
        let config = {
            headers : {
                Authorization : secureLs.get("Authorization"),
            }
        }
        return axios.post(API_URL+"/Statistics/GetTotalStatistics",null,config);
    }
    getItemStatistics(storeId,itemStoreCode){
        let config = {
            headers : {
                Authorization : secureLs.get("Authorization"),
            }
            
        }
        return axios.post(API_URL+"/Statistics/GetItemStatistics",{storeId,itemStoreCode},config);
    }
}
