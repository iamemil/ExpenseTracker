using ExpenseTrackerBackend.Helpers;
using ExpenseTrackerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExpenseTrackerBackend.Controllers
{
    public class StoreTagsController : Controller
    {
        private expensetrackerEntities db = new expensetrackerEntities();


        [HttpPost]
        public JsonResult GetStoreTags(bool withPublicTags)
        {
            string userEmail = Token.ValidateToken(HttpContext.Request.Headers.Get("Authorization"));
            if (userEmail != null)
            {
                User user = db.Users.FirstOrDefault(u => u.EmailAddress == userEmail);
                if (user != null)
                {
                    if (user.IsActive)
                    {
                        if (withPublicTags)
                        {
                            return Json(new
                            {
                                status = 200,
                                data = db.StoreTags.Where(st => st.isPublic == true || st.UserId == user.Id).Select(it => new { it.Id, it.Name, it.isPublic, it.CreationDate }).ToList()
                            }, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {
                            return Json(new
                            {
                                status = 200,
                                data = db.StoreTags.Where(st => st.UserId == user.Id).Select(it => new { it.Id, it.Name, it.isPublic, it.CreationDate }).ToList()
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

        [HttpPost]
        public JsonResult Create(string tagName)
        {
            string userEmail = Token.ValidateToken(HttpContext.Request.Headers.Get("Authorization"));
            if (userEmail != null)
            {
                User user = db.Users.FirstOrDefault(u => u.EmailAddress == userEmail);
                if (user != null)
                {
                    if (user.IsActive)
                    {
                        tagName = tagName.Trim();
                        if (string.IsNullOrEmpty(tagName) || string.IsNullOrWhiteSpace(tagName))
                        {
                            return Json(new
                            {
                                status = 405,
                                message = "Category name can't be empty"
                            }, JsonRequestBehavior.AllowGet);
                        }

                        string existingTag = tagName.ToLower();
                        if (db.StoreTags.FirstOrDefault(st => (st.isPublic == true && st.Name.ToLower() == existingTag) || (st.Name.ToLower() == existingTag && st.UserId == user.Id)) != null)
                        {
                            return Json(new
                            {
                                status = 405,
                                message = "A category with the same name already exists" 
                            }, JsonRequestBehavior.AllowGet);
                        }

                        StoreTag storeTag = new StoreTag();
                        storeTag.UserId = user.Id;
                        storeTag.CreationDate = DateTime.Now;
                        storeTag.Name = tagName;
                        storeTag.isPublic = false;

                        db.StoreTags.Add(storeTag);

                        db.SaveChanges();

                        return Json(new
                        {
                            status = 200,
                            message = tagName + " category has been added successfully"
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
        public JsonResult Edit(int Id, string tagName)
        {
            string userEmail = Token.ValidateToken(HttpContext.Request.Headers.Get("Authorization"));
            if (userEmail != null)
            {
                User user = db.Users.FirstOrDefault(u => u.EmailAddress == userEmail);
                if (user != null)
                {
                    if (user.IsActive)
                    {
                        tagName = tagName.Trim();
                        if (string.IsNullOrEmpty(tagName) || string.IsNullOrWhiteSpace(tagName))
                        {
                            return Json(new
                            {
                                status = 405,
                                message = "Category name can't be empty"
                            }, JsonRequestBehavior.AllowGet);
                        }

                        string existingTag = tagName.ToLower();
                        if (db.StoreTags.FirstOrDefault(st => (st.isPublic == true && st.Name.ToLower() == existingTag) || (st.Name.ToLower() == existingTag && st.UserId == user.Id)) != null)
                        {
                            return Json(new
                            {
                                status = 405,
                                message = "A category with the same name already exists"
                            }, JsonRequestBehavior.AllowGet);
                        }

                        StoreTag storeTag = db.StoreTags.FirstOrDefault(st => st.Id == Id && st.UserId == user.Id);
                        storeTag.CreationDate = DateTime.Now;
                        storeTag.Name = tagName;
                        db.Entry(storeTag).Property(c => c.Name).IsModified = true;
                        db.Entry(storeTag).Property(c => c.CreationDate).IsModified = true;

                        db.SaveChanges();

                        return Json(new
                        {
                            status = 200,
                            message = "Category has been renamed to " + tagName + " successfully"
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
        public JsonResult Delete(int Id)
        {
            string userEmail = Token.ValidateToken(HttpContext.Request.Headers.Get("Authorization"));
            if (userEmail != null)
            {
                User user = db.Users.FirstOrDefault(u => u.EmailAddress == userEmail);
                if (user != null)
                {
                    if (user.IsActive)
                    {
                        StoreTag deleteTag = db.StoreTags.FirstOrDefault(st => st.UserId == user.Id && st.Id == Id);
                        if (deleteTag == null)
                        {
                            return Json(new
                            {
                                status = 405,
                                message = "This category doesn't exist."
                            }, JsonRequestBehavior.AllowGet);
                        }
                        if (deleteTag.isPublic)
                        {
                            if (db.Receipts.FirstOrDefault(r=> r.StoreTagId == deleteTag.Id)!=null)
                            {
                                return Json(new
                                {
                                    status = 405,
                                    message = "This is a public category and there are some receipts with this category. Therefore, it can't be deleted."
                                }, JsonRequestBehavior.AllowGet);
                            }
                        }

                        db.StoreTags.Remove(deleteTag);
                        db.SaveChanges();

                        return Json(new
                        {
                            status = 200,
                            message = "Category has been removed successfully"
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