import axios from "axios";
import { API_URL } from "./constants";
import secureLs from "../common/helper";
const receiptApiUrl = "https://monitoring.e-kassa.gov.az/pks-portal/1.0.0/documents/";

export default class ReceiptService {


    getFromExternalSource(body) {
        return axios.get(receiptApiUrl + body);
    }

    create(body) {
        let config = {
            headers : {
                Authorization : secureLs.get("Authorization"),
            }
        }
        return axios.post(API_URL+"/Receipt/Create", body,config);
    }

}
