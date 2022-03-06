using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ExpenseTrackerBackend.Models;
namespace ExpenseTrackerBackend.Controllers
{
    public class AccountController : Controller
    {
        private expensetrackerEntities db = new expensetrackerEntities();
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }
        // export HTTPS=true&&SSL_CRT_FILE=cert.pem&&SSL_KEY_FILE=key.pem 
        [HttpPost]
        public JsonResult Login(string emailAddress, string Password)
        {
            return Json(new
            {
                status = 200,
                message = "Email: "+emailAddress + " password: "+Password
            });
        }
    }
}