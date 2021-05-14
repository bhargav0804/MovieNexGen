using Database.Repository;
using Database.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using ViewModel;
using DataAccessLayer;
using System.Web;
using System.IO;

namespace Server.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : ApiController
    {
        #region Get Movies
        [Route("api/admin/movies")]
        public IHttpActionResult GetMovies()
        {
            List<MovieViewModel> Movies;
            try
            {
                AdminOps Admin = new AdminOps();
                Movies = Admin.GetMovies();
            }
            catch 
            {
                return NotFound();
            }

            return Ok(Movies);

        }
        #endregion

        #region Get Users
        [Route("api/admin/users")]
        public IHttpActionResult GetUsers()
        {
            List<UserViewModel> Users;
            try
            {
                AdminOps Admin = new AdminOps();
                Users = Admin.GetUsers();

            }
            catch
            {
                return NotFound();
            }
            return Ok(Users);
        }
        #endregion

        #region Get Blocked Users
        [Route("api/admin/blockedusers")]
        public IHttpActionResult GetBlockedUsers()
        {
            List<UserViewModel> Users;
            try
            {
                AdminOps Admin = new AdminOps();
                Users = Admin.GetBlockedUsers();

            }
            catch
            {
                return NotFound();
            }
            return Ok(Users);
        }
        #endregion



        #region Block User
        [Route("api/admin/block")]
        public IHttpActionResult Block([FromBody] BlockUserViewModel UserModel)
        {
            try
            {
                AdminOps Admin = new AdminOps();
                Admin.BlockUser(UserModel);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Block User
        [Route("api/admin/unblock")]
        [HttpGet]
        public IHttpActionResult UnBlock(int UserId)
        {
            try
            {
                AdminOps Admin = new AdminOps();
                Admin.UnblockUser(UserId);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Post Movie
        [Route("api/admin/movie")]
        public IHttpActionResult PostMovie(
            //[FromBody] AddMovieViewModel NewMovie
            )
        {
            AddMovieViewModel NewMovie = new AddMovieViewModel();
            try
            {
                string imageName = "";

                var httpRequest = HttpContext.Current.Request;
                var postedImage = httpRequest.Files[0];
                if (postedImage != null)
                {
                    imageName = new String(Path.GetFileNameWithoutExtension(postedImage.FileName).Take(10).ToArray()).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedImage.FileName);
                    var filePath = HttpContext.Current.Server.MapPath("~/Files/" + imageName);
                    postedImage.SaveAs(filePath);
                    NewMovie.ThumbnailUrl = imageName;
                }
              

                
                NewMovie.StarCasts= httpRequest.Form["StarCasts"].Split(',').ToList();
                NewMovie.Genres = httpRequest.Form["Genres"].Split(',').ToList();
                NewMovie.Duration = Int32.Parse(httpRequest.Form["Duration"]);
                NewMovie.Plot = httpRequest.Form["Plot"];
                NewMovie.ReleaseDate = DateTime.Parse(httpRequest.Form["ReleaseDate"]);
                NewMovie.MovieTitle = httpRequest.Form["MovieTitle"];
                
                AdminOps Admin = new AdminOps();
                Admin.PostMovie(NewMovie);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message+" "+e.StackTrace + NewMovie);
            }
            return Ok();
        }
        #endregion

        #region Put Movie
        [Route("api/admin/movie")]
        public IHttpActionResult PutMovie()
        {
            AddMovieViewModel NewMovie = new AddMovieViewModel();
            try
            {
                var httpRequest = HttpContext.Current.Request;

                if (httpRequest.Form["ThumbnailFlag"]== "changed")
                {
                    string imageName = "";

                   
                    var postedImage = httpRequest.Files[0];
                    if (postedImage != null)
                    {
                        imageName = new String(Path.GetFileNameWithoutExtension(postedImage.FileName).Take(10).ToArray()).Replace(" ", "-");
                        imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedImage.FileName);
                        var filePath = HttpContext.Current.Server.MapPath("~/Files/" + imageName);
                        postedImage.SaveAs(filePath);
                        NewMovie.ThumbnailUrl = imageName;
                    }

                }
                else
                {
                    NewMovie.ThumbnailUrl = "";
                }
                int MovieId = Int32.Parse(httpRequest.Form["Id"]);
                NewMovie.StarCasts = httpRequest.Form["StarCasts"].Split(',').ToList();
                NewMovie.Genres = httpRequest.Form["Genres"].Split(',').ToList();
                NewMovie.Duration = Int32.Parse(httpRequest.Form["Duration"]);
                NewMovie.Plot = httpRequest.Form["Plot"];
                NewMovie.ReleaseDate = DateTime.Parse(httpRequest.Form["ReleaseDate"]);
                NewMovie.MovieTitle = httpRequest.Form["MovieTitle"];

                AdminOps Admin = new AdminOps();
                Admin.PutMovie(MovieId,NewMovie);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message + " " + e.StackTrace + NewMovie);
            }
            return Ok();
        }
        #endregion

        #region Delete Movie
        [Route("api/admin/movie")]
        public IHttpActionResult DeleteMovie(int MovieId)
        {
            try
            {
                AdminOps Admin = new AdminOps();
                Admin.DeleteMovie(MovieId);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Post Genre
        [Route("api/admin/genre")]
        public IHttpActionResult PostGenre([FromBody] GenreViewModel GenreModel)
        {
            try
            {
                AdminOps Admin = new AdminOps();
                if (!Admin.PostGenre(GenreModel))
                {
                    return BadRequest("Alredy added");
                }
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Put Genre
        [Route("api/admin/genre")]
        public IHttpActionResult PutGenre([FromBody] GenreViewModel GenreModel)
        {
            try
            {
                AdminOps Admin = new AdminOps();
                Admin.PutGenre(GenreModel);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Delete Genre
        [Route("api/admin/genre")]
        public IHttpActionResult DeleteGenre(int GenreId)
        {
            try
            {
                AdminOps Admin = new AdminOps();
                Admin.DeleteGenre(GenreId);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Post StarCast
        [Route("api/admin/starcast")]
        public IHttpActionResult PostStarCast([FromBody] StarCastViewModel StarCastModel)
        {
            try
            {
                AdminOps Admin = new AdminOps();
                if (!Admin.PostStarCast(StarCastModel))
                {
                    return BadRequest("Already Added");
                }
            }
            catch 
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Put StarCast
        [Route("api/admin/starcast")]
        public IHttpActionResult PutStarCast([FromBody] StarCastViewModel StarCastModel)
        {
            try
            {
                AdminOps Admin = new AdminOps();
                Admin.PutStarCast(StarCastModel);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Delete StarCast
        [Route("api/admin/starcast")]
        public IHttpActionResult DeleteStarCast(int StarCastId)
        {
            try
            {
                AdminOps Admin = new AdminOps();
                Admin.DeleteStarCast(StarCastId);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion
    }
}
