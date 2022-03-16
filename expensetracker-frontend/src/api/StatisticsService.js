import axios from "axios";
import { API_URL } from "./constants";
import secureLs from "../common/helper";
export default class StatisticsService {


    getChartStatistics(){
        let config = {
            headers : {
                Authorization : secureLs.get("Authorization"),
            }
        }
        return axios.post(API_URL+"/Statistics/GetChartStatistics",null,config);
    }

    getTotalStatistics(){
        let config = {
            headers : {
                Authorization : secureLs.get("Authorization"),
            }
        }
        return axios.post(API_URL+"/Statistics/GetTotalStatistics",null,config);
    }
}
