import QrReader from 'react-qr-reader'
import axios from "axios";
import { useState } from "react";
const receiptApiUrl = "https://monitoring.e-kassa.gov.az/pks-portal/1.0.0/documents/";
const receiptBaseUrl = "https://monitoring.e-kassa.gov.az/#/index?doc=";

export default function QrScanner({receiptCallback,receiptInitialState}) {
    const [receipt, setReceiptData] = useState(receiptInitialState);

    function handleScan(data) {
        if (data && data.includes(receiptBaseUrl)) {
            axios.get(receiptApiUrl + data.split(receiptBaseUrl)[1])
                .then(function (response) {
                    setReceiptData({
                        Id:response.data.cheque.shortDocumentId,
                        storeName:response.data.cheque.storeName,
                        storeAddress:response.data.cheque.storeAddress,
                        companyName:response.data.cheque.companyName,
                        companyTaxNumber:response.data.cheque.companyTaxNumber,
                        storeTaxNumber:response.data.cheque.storeTaxNumber,
                        receiptTotalSum: response.data.cheque.content.sum,
                        receiptTimestamp : new Date(response.data.cheque.content.createdAtUtc * 1000).toLocaleDateString('az-AZ',{day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',second:'2-digit'}),
                        receiptItems : response.data.cheque.content.items
                    });
                    console.log(receipt);
                    receiptCallback(receipt);
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