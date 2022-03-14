﻿using ExpenseTrackerBackend.Helpers;
using ExpenseTrackerBackend.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExpenseTrackerBackend.Controllers
{
    public class ReceiptController : Controller
    {
        private expensetrackerEntities db = new expensetrackerEntities();

        // GET: Receipt
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult GetAllReceipts()
        {
            string userEmail = Token.ValidateToken(HttpContext.Request.Headers.Get("Authorization"));
            if (userEmail != null)
            {
                User user = db.Users.FirstOrDefault(u => u.EmailAddress == userEmail);
                if (user != null)
                {
                    if (user.IsActive)
                    {
                        return Json(new
                        {
                            status = 200,
                            data = user.Receipts
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new
                        {
                            status = 405,
                            message = "Account needs to be verified"
                        }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json(new
                    {
                        status = 405,
                        message = "Account doesn't exist."
                    }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new
                {
                    status = 404,
                    message = "Invalid token."
                }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public JsonResult Create(string Id, string companyName, string companyTaxNumber, bool existing,string receiptItems, string receiptTimestamp, string receiptTotalSum, string storeAddress, string storeName, string storeTaxNumber, int tagId)
        {
            string userEmail = Token.ValidateToken(HttpContext.Request.Headers.Get("Authorization"));
            if (userEmail != null)
            {
                User user = db.Users.FirstOrDefault(u => u.EmailAddress == userEmail);
                if (user != null)
                {
                    if (user.IsActive)
                    {

                        if (string.IsNullOrEmpty(Id) || string.IsNullOrWhiteSpace(Id)
                            || string.IsNullOrEmpty(companyName) || string.IsNullOrWhiteSpace(companyName)
                            || string.IsNullOrEmpty(companyTaxNumber) || string.IsNullOrWhiteSpace(companyTaxNumber)
                            || string.IsNullOrEmpty(receiptTimestamp) || string.IsNullOrWhiteSpace(receiptTimestamp)
                            || string.IsNullOrEmpty(receiptTotalSum) || string.IsNullOrWhiteSpace(receiptTotalSum)
                            || string.IsNullOrEmpty(storeAddress) || string.IsNullOrWhiteSpace(storeAddress)
                            || string.IsNullOrEmpty(storeName) || string.IsNullOrWhiteSpace(storeName)
                            || string.IsNullOrEmpty(storeTaxNumber) || string.IsNullOrWhiteSpace(storeTaxNumber)
                            || tagId == null)
                        {
                            return Json(new
                            {
                                status = 405,
                                message = "Something went wrong, try again later."
                            }, JsonRequestBehavior.AllowGet);

                        }
                        if (!existing)
                        {
                            Company company = db.Companies.FirstOrDefault(c => c.TaxNumber==companyTaxNumber);
                            if (company == null)
                            {
                                Company newCompany = new Company();
                                newCompany.Name = companyName;
                                newCompany.TaxNumber = companyTaxNumber;
                                newCompany.creationDate = DateTime.Now;
                                db.Companies.Add(newCompany);
                                db.SaveChanges();
                            }
                            company = db.Companies.FirstOrDefault(c => c.TaxNumber == companyTaxNumber);

                            Store store = db.Stores.FirstOrDefault(st => st.TaxNumber == storeTaxNumber);
                            if(store == null)
                            {
                                Store newStore = new Store();
                                newStore.CompanyId = company.Id;
                                newStore.Name = storeName;
                                newStore.Address = storeAddress;
                                newStore.TaxNumber = storeTaxNumber;
                                newStore.creationDate = DateTime.Now;
                                db.Stores.Add(newStore);
                                db.SaveChanges();
                            }
                            store = db.Stores.FirstOrDefault(st => st.TaxNumber == storeTaxNumber);

                            Receipt receiptExists = db.Receipts.FirstOrDefault(r => r.UserId == user.Id && r.originalReceiptId == Id);
                            if (receiptExists != null)
                            {
                                //List<Models.DataModels.ReceiptItem> items = new List<Models.DataModels.ReceiptItem>();

                                return Json(new
                                {
                                    status = 405,
                                    message = "This receipt already exists."
                                }, JsonRequestBehavior.AllowGet);
                            }

                            StoreTag storeTag = db.StoreTags.Where(st => st.isPublic == true || st.UserId == user.Id).FirstOrDefault(st=> st.Id==tagId);
                            if (storeTag == null)
                            {
                                return Json(new
                                {
                                    status = 405,
                                    message = "This category doesn't exists."
                                }, JsonRequestBehavior.AllowGet);
                            }

                            Receipt newReceipt = new Receipt();
                            newReceipt.UserId = user.Id;
                            newReceipt.StoreId = store.Id;
                            newReceipt.originalReceiptId = Id;
                            newReceipt.PurchaseDate = DateTime.Parse(receiptTimestamp);
                            newReceipt.TotalSum = decimal.Parse(receiptTotalSum);
                            newReceipt.StoreTagId = storeTag.Id;
                            newReceipt.creationDate = DateTime.Now;

                            db.Receipts.Add(newReceipt);
                            db.SaveChanges();

                            List<Models.DataModels.ReceiptItem> items = JsonConvert.DeserializeObject<List<Models.DataModels.ReceiptItem>>(receiptItems);

                            foreach (var item in items)
                            {
                                Item item1 = db.Items.FirstOrDefault(i => i.ItemStoreCode == item.itemCode && i.StoreId==store.Id);
                                if (item1 == null)
                                {
                                    Item newItem = new Item();
                                    newItem.Name = item.itemName;
                                    newItem.StoreId = store.Id;
                                    newItem.ItemStoreCode = item.itemCode;
                                    newItem.creationDate = DateTime.Now;
                                    db.Items.Add(newItem);
                                    db.SaveChanges();
                                }
                                item1 = db.Items.FirstOrDefault(i => i.ItemStoreCode == item.itemCode && i.StoreId == store.Id);

                                ReceiptItem receiptItem = new ReceiptItem();
                                receiptItem.ReceiptId = newReceipt.Id;
                                receiptItem.ItemId = item1.Id;
                                receiptItem.Quantity = item.itemQuantity;
                                receiptItem.Price = item.itemPrice;
                                db.ReceiptItems.Add(receiptItem);
                            }
                            db.SaveChanges();
                            return Json(new
                            {
                                status = 200,
                                message = "Receipt has been added successfully"
                            }, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {
                            return Json(new
                            {
                                status = 200,
                                message = "Work on progress"
                            }, JsonRequestBehavior.AllowGet);
                        }

                    }
                    else
                    {
                        return Json(new
                        {
                            status = 405,
                            message = "Account needs to be verified"
                        }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json(new
                    {
                        status = 405,
                        message = "Account doesn't exist."
                    }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new
                {
                    status = 404,
                    message = "Invalid token."
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}