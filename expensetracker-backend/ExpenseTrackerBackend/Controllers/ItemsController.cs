using ExpenseTrackerBackend.Helpers;
using ExpenseTrackerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExpenseTrackerBackend.Controllers
{
    public class ItemsController : Controller
    {
        private expensetrackerEntities db = new expensetrackerEntities();

        // GET: Items
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetUserReceiptItems()
        {
            string userEmail = Token.ValidateToken(HttpContext.Request.Headers.Get("Authorization"));
            if (userEmail != null)
            {
                User user = db.Users.FirstOrDefault(u => u.EmailAddress == userEmail);
                if (user != null)
                {
                    if (user.IsActive)
                    {
                        var userReceiptItemIds = db.ReceiptItems.Where(ri => ri.Receipt.UserId == user.Id).Select(f => f.ItemId);
                        if (userReceiptItemIds.Count() == 0)
                        {
                            return Json(new
                            {
                                status = 405,
                                message = "Not enough receipt data"
                            }, JsonRequestBehavior.AllowGet);
                        }
                        var userReceiptItems = db.Items.Where(i => userReceiptItemIds.Contains(i.Id)).Select(it=> new { it.StoreId, storeName = it.Store.Name, it.Name, it.ItemStoreCode}).ToList();
                        return Json(new
                        {
                            status = 200,
                            userReceiptItems
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
    }
}