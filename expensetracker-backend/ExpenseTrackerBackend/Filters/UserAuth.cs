using ExpenseTrackerBackend.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Mvc;

namespace ExpenseTrackerBackend.Filters
{
    public class UserAuth : ActionFilterAttribute
    { 
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.Request.Headers.Get("Authorization") != null)
            {
                var authToken = filterContext.HttpContext.Request.Headers.Get("Authorization");
                var user = Token.ValidateToken(authToken);
                if (user == null)
                {
                    filterContext.Result = new RedirectResult("~/Account/Login");
                    return;
                }
            }
            else
            {
                filterContext.Result = new RedirectResult("~/Account/Login");
                return;
            }
            base.OnActionExecuting(filterContext);
        }

    }
}