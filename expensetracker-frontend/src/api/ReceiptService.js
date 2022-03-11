import axios from "axios";
const receiptApiUrl = "https://monitoring.e-kassa.gov.az/pks-portal/1.0.0/documents/";

export default class ExternalReceiptService {

    getFromExternalSource(body) {
        return axios.get(receiptApiUrl + body);
    }

}
