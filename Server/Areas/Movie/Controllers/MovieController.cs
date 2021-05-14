using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ViewModel;
using Database.Model;
using Database.Repository;
using DataAccessLayer;
using System.Security.Claims;

namespace Server.Areas.Movie.Controllers
{
    [Authorize(Roles = "User,Admin")]
    public class MovieController : ApiController
    {
        #region Get Genre
        //[Authorize(Roles="User")]
        [Route("api/movie/genre")]
        public IHttpActionResult GetGenre()
        {
            List<GenreViewModel> Genres = new List<GenreViewModel>();
            try
            {
                
                    var identity = User.Identity as ClaimsIdentity;
                    if (identity != null)
                    {
                        MovieOps Movie = new MovieOps();
                        Genres = Movie.GetGenre();
                    }
                



            }
            catch
            {
                return NotFound();
            }
            return Ok(Genres);
        }
        #endregion

        #region Get StarCast
        [Route("api/movie/starcast")]
        public IHttpActionResult GetStarCast()
        {
            List<StarCastViewModel> StarCasts;
            try
            {
                MovieOps Movie = new MovieOps();
                StarCasts = Movie.GetStarCast();

            }
            catch
            {
                return NotFound();
            }
            return Ok(StarCasts);
        }
        #endregion

        #region Get Review
        [Route("api/movie/review")]
        public IHttpActionResult GetReview(int Id)
        {
            List<ReviewViewModel> ReviewList;
            try
            {
                MovieOps Movie = new MovieOps();
                ReviewList = Movie.GetReviews(Id);
            }
            catch
            {
                return NotFound();
            }
            return Ok(ReviewList);
        }
        #endregion

        #region Get Movie By Id
        [Route("api/movie/movie")]
        public IHttpActionResult GetMovie(int id)
        {
            MovieViewModel Movie;
            try
            {
                MovieOps MovieOps = new MovieOps();
                Movie = MovieOps.GetMovie(id);
            }
            catch
            {
                return NotFound();
            }
            return Ok(Movie);
        }
        #endregion

        #region Get Movie By Genre
        [Route("api/movie/movie")]
        public IHttpActionResult GetMovie(string GenreName)
        {
            List<MovieViewModel> Movies;

            try
            {
                MovieOps movieOps = new MovieOps();
                Movies = movieOps.GetMovieByGenre(GenreName);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return Ok(Movies);
        }
        #endregion

        #region Get Movie By Cast
        [Route("api/movie/searchbycast")]
        [HttpPost]
        public IHttpActionResult SearchByCast([FromBody]StarCastViewModel StarCast)
        {
            List<MovieViewModel> Movies;
            string[] StarCasts = StarCast.StarCastName.Split(new char[] { ','}).ToArray();
            try
            {
                MovieOps movieOps = new MovieOps();
                Movies = movieOps.GetMovieByStarCast(StarCasts);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message + " " + e.StackTrace);
            }
            return Ok(Movies);
        }
        #endregion
    }
}
