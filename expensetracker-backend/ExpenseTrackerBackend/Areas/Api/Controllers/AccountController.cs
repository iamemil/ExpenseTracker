using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Mvc;
using Ganss.XSS;
using ExpenseTrackerBackend.Models;
using System.Text.RegularExpressions;
using System.Web.Helpers;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using Twilio;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ExpenseTrackerBackend.Helpers;
using ExpenseTrackerBackend.Filters;

namespace ExpenseTrackerBackend.Areas.Api.Controllers
{

    public class AccountController : Controller
    {
        private expensetrackerEntities db = new expensetrackerEntities();

        // export HTTPS=true&&SSL_CRT_FILE=cert.pem&&SSL_KEY_FILE=key.pem 
        [HttpPost]
        public JsonResult SignIn(string emailAddress, string Password)
        {
            if (string.IsNullOrEmpty(emailAddress) || string.IsNullOrWhiteSpace(emailAddress) || string.IsNullOrEmpty(Password) || string.IsNullOrWhiteSpace(Password))
            {
                return Json(new
                {
                    status = 405,
                    message = "Fill All Fields"
                }, JsonRequestBehavior.AllowGet);

            }
            emailAddress = emailAddress.ToLower();
            User user = db.Users.FirstOrDefault(c => c.EmailAddress == emailAddress);
            if (user != null)
            {
                if (user.IsActive)
                {
                    if (Crypto.VerifyHashedPassword(user.Password, Password))
                    {
                        Session["Login"] = true;
                        Session["User"] = user;
                        return Json(new
                        {
                          status = 200,
                          token = Token.GetToken(user)
                        });
                        
                    }
                }
                else
                {
                    return Json(new
                    {
                        status = 405,
                        message = "Email address needs to be verified"
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

            return Json(new
            {
                status = 405,
                message = "Wrong Credentials, try again."
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Register(string firstName, string lastName, string mobileNumber, string emailAddress, string Password)
        {
            if (string.IsNullOrEmpty(firstName) || string.IsNullOrWhiteSpace(lastName) || string.IsNullOrEmpty(lastName) || string.IsNullOrWhiteSpace(lastName) || string.IsNullOrEmpty(mobileNumber) || string.IsNullOrWhiteSpace(mobileNumber) || string.IsNullOrEmpty(emailAddress) || string.IsNullOrWhiteSpace(emailAddress) || string.IsNullOrEmpty(Password) || string.IsNullOrWhiteSpace(Password))
            {
                return Json(new
                {
                    status = 405,
                    message = "Fill All Fields"
                }, JsonRequestBehavior.AllowGet);
            }

            HtmlSanitizer sanitizer = new HtmlSanitizer();

            firstName = sanitizer.Sanitize(firstName.Trim());
            lastName = sanitizer.Sanitize(lastName.Trim());
            emailAddress = emailAddress.Trim();
            emailAddress = emailAddress.ToLower();
            mobileNumber = "+" + mobileNumber.Trim();
            if (firstName.Length < 3)
            {
                return Json(new
                {
                    status = 405,
                    message = "Firstname length should be bigger than 3 characters"
                }, JsonRequestBehavior.AllowGet);
            }
            if (lastName.Length < 3)
            {
                return Json(new
                {
                    status = 405,
                    message = "Lastname length should be bigger than 3 characters"
                }, JsonRequestBehavior.AllowGet);
            }

            if (Password.Length < 8)
            {
                return Json(new
                {
                    status = 405,
                    message = "Password should be longer than 8 characters"
                }, JsonRequestBehavior.AllowGet);
            }

            string validEmailPattern = @"^(?!\.)(""([^""\r\\]|\\[""\r\\])*""|"
            + @"([-a-z0-9!#$%&'*+/=?^_`{|}~]|(?<!\.)\.)*)(?<!\.)"
            + @"@[a-z0-9][\w\.-]*[a-z0-9]\.[a-z][a-z\.]*[a-z]$";

            if (!Regex.Match(emailAddress, validEmailPattern).Success)
            {
                return Json(new
                {
                    status = 405,
                    message = "Invalid Email Address"
                }, JsonRequestBehavior.AllowGet);
            }


            string hungarianMobileNumberPattern = @"^((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})$";
            string mobileNumberPattern = @"^\+(?:[0-9]●?){6,14}[0-9]$";

            if (!Regex.Match(mobileNumber, mobileNumberPattern).Success)
            {
                return Json(new
                {
                    status = 405,
                    message = "Invalid mobile number"
                }, JsonRequestBehavior.AllowGet);
            }


            User userExists = db.Users.FirstOrDefault(c => c.EmailAddress == emailAddress);

            if (userExists != null)
            {
                userExists = null;
                return Json(new
                {
                    status = 405,
                    message = "An account with this email address already exists"
                }, JsonRequestBehavior.AllowGet);
            }

            User newUser = new User();

            newUser.Firstname = firstName;
            newUser.Lastname = lastName;
            newUser.EmailAddress = emailAddress;
            newUser.IsActive = false;
            newUser.IsAdmin = false;
            newUser.PhoneNumber = mobileNumber;
            newUser.Token = Crypto.Hash(newUser.EmailAddress + DateTime.Now.ToString("yyyyMMddHHmmss"), "sha256");
            newUser.Password = Crypto.HashPassword(Password);
            newUser.creationDate = DateTime.Now;
            db.Users.Add(newUser);
            db.SaveChanges();
            String verifyUrl = "Thanks for registering on Expense Tracker. Click here to verify your account: " + Request.Url.Scheme + "://" + Request.Url.Authority + "/Account/Confirm?token=" + newUser.Token;
            this.SendSms(mobileNumber, verifyUrl);

            return Json(new
            {
                status = 200
            });
        }


        private void SendSms(string phoneNumber, string messageBody)
        {
            var accountSid = "AC19a7ccd9d7233bb4ba4033f2bc9ce439";
            var authToken = "69340c66df1184af162955fb72c25d6e";

            TwilioClient.Init(accountSid, authToken);

            var messageOptions = new CreateMessageOptions(
                new PhoneNumber(phoneNumber));
            messageOptions.MessagingServiceSid = "MG1433b2b218c11992ef1338ccdd149f78";
            messageOptions.Body = messageBody;

            var message = MessageResource.Create(messageOptions);
            Console.WriteLine(message.Body);
        }
        public JsonResult Confirm(string token)
        {
            User user = db.Users.FirstOrDefault(cu => cu.Token == token);
            if (user == null)
            {
                return Json(new
                {
                    status = 404,
                    message = "User doesn't exist."
                });
            }

            if (user.IsActive)
            {
                return Json(new
                {
                    status = 300,
                    message = "User is already verified."
                });
            }

            user.IsActive = true;
            db.SaveChanges();
            return Json(new
            {
                status = 200,
                message = "User verified successfully."
            });
        }

        [HttpPost]
        [UserAuth]
        public JsonResult GetUserDetails()
        {
            string userEmail = Token.ValidateToken(HttpContext.Request.Headers.Get("Authorization"));
            User user = db.Users.FirstOrDefault(u => u.EmailAddress == userEmail);
            if (user != null)
            {
                if (user.IsActive)
                {
                    return Json(new
                    {
                        status = 200,
                        message = user.PhoneNumber
                    }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new
                    {
                        status = 405,
                        message = "Email address needs to be verified"
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

            return Json(new
            {
                status = 405,
                message = "Wrong Credentials, try again."
            }, JsonRequestBehavior.AllowGet);
        }

        private string createToken(string username)
        {
            //Set issued at date
            DateTime issuedAt = DateTime.UtcNow;
            //set the time when it expires
            DateTime expires = DateTime.UtcNow.AddMinutes(10);

            //http://stackoverflow.com/questions/18223868/how-to-encrypt-jwt-security-token
            var tokenHandler = new JwtSecurityTokenHandler();

            //create a identity and add claims to the user which we want to log in
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, username)
            });

            const string sec = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";
            var now = DateTime.UtcNow;
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);


            //create the jwt
            var token =
                (JwtSecurityToken)
                    tokenHandler.CreateJwtSecurityToken(issuer: Request.Url.Scheme + "://" + Request.Url.Authority, audience: Request.Url.Scheme + "://" + Request.Url.Authority,
                        subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }


    }
}