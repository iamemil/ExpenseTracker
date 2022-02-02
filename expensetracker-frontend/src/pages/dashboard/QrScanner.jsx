import QrReader from 'react-qr-reader'
import axios from "axios";
import { useState } from "react";
const receiptApiUrl = "https://monitoring.e-kassa.gov.az/pks-portal/1.0.0/documents/";
const receiptBaseUrl = "https://monitoring.e-kassa.gov.az/#/index?doc=";

export default function QrScanner({receiptCallback}) {
    const [receipt, setReceiptData] = useState({Id:"",storeName:"",storeAddress:"",companyName:"",companyTaxNumber:"",storeTaxNumber:""});

    function handleScan(data) {
        if (data && data.includes(receiptBaseUrl)) {
            axios.get(receiptApiUrl + data.split(receiptBaseUrl)[1])
                .then(function (response) {
                    console.log(response.data.cheque);
                    setReceiptData({Id:response.data.cheque.shortDocumentId,storeName:response.data.cheque.storeName,storeAddress:response.data.cheque.storeAddress,companyName:response.data.cheque.companyName,companyTaxNumber:response.data.cheque.companyTaxNumber,storeTaxNumber:response.data.cheque.storeTaxNumber});
                    receiptCallback({Id:response.data.cheque.shortDocumentId,storeName:response.data.cheque.storeName,storeAddress:response.data.cheque.storeAddress,companyName:response.data.cheque.companyName,companyTaxNumber:response.data.cheque.companyTaxNumber,storeTaxNumber:response.data.cheque.storeTaxNumber});
                })
                .catch(function (error) {
                    console.log(error);
                    return error
                })
                .then(function () {
                    // always executed
                });
        }
    }
    function handleError(err) {
        console.error(err)
    }
    return (
        <div>
            <QrReader
                delay={500}
                onError={handleError}
                onScan={handleScan}
            />
        </div>
    )
}