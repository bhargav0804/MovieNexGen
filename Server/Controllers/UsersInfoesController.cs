using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Database.Model;
using Database.Repository;

namespace Server.Controllers
{
    public class UsersInfoesController : Controller
    {
        private Context db = new Context();

        // GET: UsersInfoes
        public ActionResult Index()
        {
            return View(db.Users.ToList());
        }

        // GET: UsersInfoes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UsersInfo usersInfo = db.Users.Find(id);
            if (usersInfo == null)
            {
                return HttpNotFound();
            }
            return View(usersInfo);
        }

        // GET: UsersInfoes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: UsersInfoes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "UserId,Name,Email,PhoneNumber,Password,DateOfBirth,Gender,ProfilePhotoUrl,BlockMessage,BlockDateTime,Role_RoleId")] UsersInfo usersInfo)
        {
                
                db.Users.Add(usersInfo);
                db.SaveChanges();
                return RedirectToAction("Index");
           

           
        }

        // GET: UsersInfoes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UsersInfo usersInfo = db.Users.Find(id);
            if (usersInfo == null)
            {
                return HttpNotFound();
            }
            return View(usersInfo);
        }

        // POST: UsersInfoes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "UserId,Name,Email,PhoneNumber,Password,DateOfBirth,Gender,ProfilePhotoUrl,BlockMessage,BlockDateTime")] UsersInfo usersInfo)
        {
            if (ModelState.IsValid)
            {
                db.Entry(usersInfo).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(usersInfo);
        }

        // GET: UsersInfoes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UsersInfo usersInfo = db.Users.Find(id);
            if (usersInfo == null)
            {
                return HttpNotFound();
            }
            return View(usersInfo);
        }

        // POST: UsersInfoes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            UsersInfo usersInfo = db.Users.Find(id);
            db.Users.Remove(usersInfo);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
