using DataAccessLayer;
using Database.Model;
using Database.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.Http;
using ViewModel;

namespace Server.Areas.User.Controllers
{
  
    public class UserController : ApiController
    {
      

        #region Get Movies
        [Route("api/user/movies")]
        [Authorize(Roles = "User")]
        public IHttpActionResult GetMovies()
        {
            List<MovieViewModel> Movies = new List<MovieViewModel>();
            try
            {
                UserOps User = new UserOps();
                Movies = User.GetMovies();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message+" "+e.StackTrace);
            }

            return Ok(Movies);

        }
        #endregion

        #region Get History
        [Authorize(Roles = "User")]
        [Route("api/user/history")]
        [HttpGet]
        public IHttpActionResult History()
        {

            List<MovieViewModel> Movies;
            try
            {
                UserOps User = new UserOps();
                Movies = User.GetHistory();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(Movies);

        }
        #endregion

        #region Add History
        [Authorize(Roles = "User")]
        [Route("api/user/history")]
        [HttpPost]
        public IHttpActionResult History( int MovieId)
        {
            try
            {
                UserOps User = new UserOps();
                User.PostHistory( MovieId);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Delete History
        [Authorize(Roles = "User")]
        [Route("api/user/history")]
        public IHttpActionResult DeleteHistory(int MovieId)
        {
            try
            {
                UserOps User = new UserOps();
                User.DeleteHistory( MovieId);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Get Watch Later
        [Authorize(Roles = "User")]
        [Route("api/user/watchlater")]
        [HttpGet]
        public IHttpActionResult WatchLater(int id)
        {
            List<MovieViewModel> Movies;
            try
            {
                UserOps User = new UserOps();
                Movies = User.GetWatchLater(id);
            }
            catch
            {
                return NotFound();
            }
            return Ok(Movies);
        }
        #endregion

        #region Post WatchLater
        [Authorize(Roles = "User")]
        [Route("api/user/watchlater")]
        [HttpPost]
        public IHttpActionResult PostWatchLater(int MovieId)
        {
            try
            {
                UserOps User = new UserOps();
                User.PostWatchLater(MovieId);
                
            }
            catch(Exception e)
            {
                return BadRequest(e.Message+ " "+e.StackTrace);
            }
            return Ok();
        }
        #endregion

        #region Delete Watch Later
        [Authorize(Roles = "User")]
        [Route("api/user/watchlater")]
       
        public IHttpActionResult DeleteWatchLater(int MovieId)
        {
            try
            {
                UserOps User = new UserOps();
                User.DeleteWatchLater(MovieId);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Get Notifivation
        [Authorize(Roles = "User")]
        [Route("api/user/notification")]
        [HttpGet]
        public IHttpActionResult Notification()
        {

            List<NotificationViewModel> Notifications;
            try
            {
                UserOps User = new UserOps();
                Notifications = User.GetNotifications();
            }
            catch
            {
                return NotFound();
            }
            return Ok(Notifications);
        }
        #endregion

        //#region Post Notification
        //[Route("api/user/notification")]
        //public IHttpActionResult PostNotification([FromBody] Notifications NewNotification)
        //{
        //    try
        //    {
        //        UserOps User = new UserOps();
        //        if (!User.PostNotification(NewNotification))
        //        {
        //            return BadRequest("Already Added");
        //        }
        //    }
        //    catch
        //    {
        //        return NotFound();
        //    }
        //    return Ok();
        //}
        //#endregion

        #region Delete Notification
        [Authorize(Roles = "User")]
        [Route("api/user/notification")]
        [HttpDelete]
        public IHttpActionResult Notification(int SenderId,int MovieId)
        {
            try
            {
                UserOps User = new UserOps();
                User.DeleteNotification(SenderId, MovieId);

            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Add SearchHistory
        [Authorize(Roles = "User")]
        [Route("api/user/search")]
       public IHttpActionResult PostSearch( int UserId,[FromBody] UserSearchHistory SearchHistory)
        {
            try
            {
                UserOps User = new UserOps();
                User.PostSearchHistory(UserId,SearchHistory);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Get Reviews
        [Authorize(Roles = "User")]
        [Route("api/user/review")]
        public IHttpActionResult GetReview()
        {
            List<ReviewViewModel> ReviewList;
            try
            {
                UserOps User = new UserOps();
                ReviewList = User.GetReviews();
            }
            catch(Exception e)
            {
                return NotFound();
            }

            return Ok(ReviewList);

        }
        #endregion

        #region Add Review
        [Authorize(Roles = "User")]
        [Route("api/user/review")]
        public IHttpActionResult PostReview([FromBody] Reviews NewReview)
        {
            try
            {
                UserOps User = new UserOps();
                 User.PostReviews(NewReview);
            }
            catch(Exception e)
            {
                return BadRequest(e.StackTrace);
            }
            return Ok();
        }
        #endregion

        #region Get User
        [Authorize(Roles="User,Admin")]
        [Route("api/user/profile")]
        public IHttpActionResult GetProfile()
        {
            UserViewModel UserInfo;
            try
            {
                UserOps User = new UserOps();
                UserInfo=User.GetProfile();
            }
            catch
            {
                return NotFound();
            }
            return Ok(UserInfo);
        }
        #endregion

        #region Post ProfileImage
        [Authorize(Roles = "User")]
        [Route("api/user/editprofileimg")]
        public IHttpActionResult editprofileimg()
        {
            var httpRequest = HttpContext.Current.Request;
           
                
               


            try
            {

                string imageName = "";


                var postedImage = httpRequest.Files[0];
                if (postedImage != null)
                {
                    imageName = new String(Path.GetFileNameWithoutExtension(postedImage.FileName).Take(10).ToArray()).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedImage.FileName);
                    var filePath = HttpContext.Current.Server.MapPath("~/Files/Profiles/" + imageName);
                    postedImage.SaveAs(filePath);
                    UserOps User = new UserOps();
                    User.PostProfileImg(imageName);
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message+" "+e.StackTrace);
            }
            return Ok();
        }
        #endregion

        [Authorize(Roles = "User")]
        [Route("api/user/share")]
        [HttpGet]
        public IHttpActionResult ShareMovie(string Email,string MovieTitle)
        {
            UserViewModel UserInfo;
            try
            {
                UserOps User = new UserOps();
                UserInfo = User.GetProfile();
                sendcode(Email, UserInfo.Name, MovieTitle);
                User.PostNotification(Email, MovieTitle);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message+"  "+e.StackTrace);
            }
            return Ok();
        }

        static void NEVER_EAT_POISON_Disable_CertificateValidation()
        {
            // Disabling certificate validation can expose you to a man-in-the-middle attack
            // which may allow your encrypted message to be read by an attacker
            // https://stackoverflow.com/a/14907718/740639
            ServicePointManager.ServerCertificateValidationCallback =
                delegate (
                    object s,
                    X509Certificate certificate,
                    X509Chain chain,
                    SslPolicyErrors sslPolicyErrors
                ) {
                    return true;
                };
        }
        private void sendcode(string Email,string UserName,string MovieName)
        {
            
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "172.27.172.202";
            smtp.Port = 25;
            smtp.Credentials = new System.Net.NetworkCredential("vrushalib@evolvingsols.com", "Tiger@321");
            smtp.EnableSsl = true;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            MailMessage msg = new MailMessage();
            msg.Subject = "Activation code to verfiy";
            msg.Body = "Dear User ,"+UserName+" has suggested you: "+MovieName;
            string toaddress = Email;
            msg.To.Add(toaddress);
            string fromaddress = "vrushalib@evolvingsols.com";
            msg.From = new MailAddress(fromaddress);
            try
            {
                NEVER_EAT_POISON_Disable_CertificateValidation();
                smtp.Send(msg);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Authorize(Roles = "User")]
        [Route("api/user/suggested")]
        public IHttpActionResult GetSuggested()
        {
            List<MovieViewModel> Movies;
            try
            {
                UserOps User = new UserOps();
                Movies = User.GetSuggested();
            }
            catch
            {
                return NotFound();
            }
            return Ok(Movies);
        } 

    }
}
