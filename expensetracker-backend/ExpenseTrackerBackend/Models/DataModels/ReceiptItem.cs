using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTrackerBackend.Models.DataModels
{
    public class ReceiptItem
    {
        public int? itemNumber;
        public string itemName;
        public int? itemCodeType;
        public decimal itemQuantity;
        public string itemCode;
        public decimal itemPrice;
        public decimal itemSum;
        public int? itemVatPercent;

    }
}