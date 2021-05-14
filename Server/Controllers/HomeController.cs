using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Database.Repository;
using Database.Model;
namespace Server.Controllers
{
    public class HomeController : Controller
    {
        Context db = new Context();
        
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            return View();
        }
    }
}
