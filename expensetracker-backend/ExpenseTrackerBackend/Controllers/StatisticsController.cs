using ExpenseTrackerBackend.Helpers;
using ExpenseTrackerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExpenseTrackerBackend.Controllers
{
    public class StatisticsController : Controller
    {
        private expensetrackerEntities db = new expensetrackerEntities();
        // GET: Statistics
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetTotalStatistics()
        {
            string userEmail = Token.ValidateToken(HttpContext.Request.Headers.Get("Authorization"));
            if (userEmail != null)
            {
                User user = db.Users.FirstOrDefault(u => u.EmailAddress == userEmail);
                if (user != null)
                {
                    if (user.IsActive)
                    {
                        var totalSpent = db.Receipts.Where(r => r.UserId == user.Id).Sum(r => r.TotalSum);
                        var topCategories = db.Receipts.Where(r => r.UserId == user.Id).Select(r => new { r.StoreTag.Name, r.TotalSum }).GroupBy(x => new { x.Name }, (key, group) => new {key.Name, Amount = group.Sum(c => c.TotalSum) }).OrderByDescending(k=> k.Amount).ToList();
                        var topStores = db.Receipts.Where(r => r.UserId == user.Id).Select(r => new { r.Store.Name, r.TotalSum }).GroupBy(x => new { x.Name }, (key, group) => new { key.Name, Amount = group.Sum(c => c.TotalSum) }).OrderByDescending(k => k.Amount).ToList();
                        return Json(new
                        {
                            status = 200,
                            data = new {totalSpent, topCategories, topStores }
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
        public JsonResult GetChartStatistics(DateTime? beginDate, DateTime? endDate)
        {
            string userEmail = Token.ValidateToken(HttpContext.Request.Headers.Get("Authorization"));
            if (userEmail != null)
            {
                User user = db.Users.FirstOrDefault(u => u.EmailAddress == userEmail);
                if (user != null)
                {
                    if (user.IsActive)
                    {
                        var Expenses = db.Receipts.Where(r => r.UserId == user.Id).Select(re => new {re.PurchaseDate.Year, re.PurchaseDate.Month,re.StoreTag.Name,re.StoreTagId,re.TotalSum }).GroupBy(x => new{ x.StoreTagId, x.Name}, (key,group) => new {tagId = key.StoreTagId, tagName = key.Name, data = group.GroupBy(q=> new {q.Year, q.Month }, (kkey,ggroup) => new{ year = kkey.Year, month=kkey.Month, amount=ggroup.Sum(c => c.TotalSum) }) }).ToList();

                        return Json(new
                        {
                            status = 200,
                            data = Expenses
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