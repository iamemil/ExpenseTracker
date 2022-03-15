using ExpenseTrackerBackend.Helpers;
using ExpenseTrackerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExpenseTrackerBackend.Controllers
{
    public class CompaniesController : Controller
    {
        private expensetrackerEntities db = new expensetrackerEntities();

        public JsonResult GetAllCompanies()
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
                            data = db.Companies.Select(it => new { it.Id, it.Name, it.CreationDate, it.TaxNumber }).ToList()
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