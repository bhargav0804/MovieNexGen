using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database.Repository;
using Database.Model;
using ViewModel;
using System.Web;
using System.Security.Claims;

namespace DataAccessLayer
{
    
    public class MovieOps
    {
        Context db = new Context();
        public List<GenreViewModel> GetGenre()
        {
            List<GenreViewModel> Genres;
           
                using (db)
                {
                    Genres = (from Genre in db.Genres
                              select new GenreViewModel
                              {
                                  GenreId = Genre.GenreId,
                                  GenreName = Genre.GenreName
                              }).ToList();
                }

            return Genres;
        }
        public List<StarCastViewModel> GetStarCast()
        {
            List<StarCastViewModel> StarCasts;
           
                using (db)
                {
                    StarCasts = (from StarCast in db.StarCasts
                                 select new StarCastViewModel
                                 {
                                     StarCastId = StarCast.StarCastId,
                                     StarCastName = StarCast.StarCastName
                                 }).ToList();
                }

            return StarCasts;
        }

        public List<ReviewViewModel> GetReviews(int id)
        {
            List<ReviewViewModel> ReviewList;
            var url = HttpContext.Current.Request.Url;
            var path = url.Scheme + "://" + url.Host + ":" + url.Port + "/Files/Profiles/";
            using (db)
            {
                ReviewList = (from Review in db.Reviews
                              where Review.MovieId == id
                              select new ReviewViewModel
                              {
                                  MovieId = Review.MovieId,
                                  UserId = Review.UserId,
                                  Review = Review.Review,
                                  Rating = Review.Rating,
                                  UserName = Review.User.Name,
                                  MovieName = Review.Movie.MovieTitle,
                                  UserProfileUrl =path+ Review.User.ProfilePhotoUrl
                              }).ToList();

            }
            return ReviewList;
        }

        public MovieViewModel GetMovie(int id)
        {
            MovieViewModel Movies;
            var url = HttpContext.Current.Request.Url;
            var path = url.Scheme + "://" + url.Host + ":" + url.Port + "/Files/";
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                MoviesInfo Movie = db.Movies.Find(id);

                Movies =  new
                          MovieViewModel
                          {
                              MovieId = Movie.MovieId,
                              MovieTitle = Movie.MovieTitle,
                              Duration = Movie.Duration,
                              ReleaseDate = Movie.ReleaseDate,
                              Plot = Movie.Plot,
                              Rating = (float?)(from Review in Movie.Reviews
                                        where Review!=null
                                        select (float?)Review.Rating).Average(),
                              ThumbnailUrl = path + Movie.ThumbnailUrl,
                              VideoUrl = Movie.VideoUrl,
                              Hidden = Movie.Hidden,
                              Genres = (from Genre in Movie.Genres
                                        select new GenreViewModel
                                        {
                                            GenreId = Genre.GenreId,
                                            GenreName = Genre.GenreName
                                        }).ToList(),
                              StarCasts = (from Star in Movie.StarCasts
                                           select new StarCastViewModel
                                           {
                                               StarCastId = Star.StarCastId,
                                               StarCastName = Star.StarCastName
                                           }).ToList(),
                     HistoryBool = (from User in Movie.UsersWatchHistory
                                   where User.UserId == Id
                                   select User).Any(),
                     WatchLaterBool = (from User in Movie.UsersWatchLater
                                      where User.UserId == Id
                                      select User).Any()

                };
            }
            return Movies;
        }

        public List<MovieViewModel> GetMovieByGenre(string GenreName)
        {
            List<MovieViewModel> Movies=new List<MovieViewModel>();
            var url = HttpContext.Current.Request.Url;
            var path = url.Scheme + "://" + url.Host + ":" + url.Port + "/Files/";
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                Genres GenreItem = db.Genres.FirstOrDefault(g => g.GenreName == GenreName);
                Movies = (from Movie in GenreItem.Movies
                          where !Movie.Hidden
                          select new
                             MovieViewModel
                          {
                              MovieId = Movie.MovieId,
                              MovieTitle = Movie.MovieTitle,
                              Duration = Movie.Duration,
                              ReleaseDate = Movie.ReleaseDate,
                              Plot = Movie.Plot,
                              Rating = (float?)(from Review in Movie.Reviews
                                                where Review != null
                                                select (float?)Review.Rating).Average(),
                              ThumbnailUrl = path + Movie.ThumbnailUrl,
                              VideoUrl = Movie.VideoUrl,
                              Hidden = Movie.Hidden,
                              Genres = (from Genre in Movie.Genres
                                        select new GenreViewModel
                                        {
                                            GenreId = Genre.GenreId,
                                            GenreName = Genre.GenreName
                                        }).ToList(),
                              StarCasts = (from Star in Movie.StarCasts
                                           select new StarCastViewModel
                                           {
                                               StarCastId = Star.StarCastId,
                                               StarCastName = Star.StarCastName
                                           }).ToList(),
                              HistoryBool = (from User in Movie.UsersWatchHistory
                                             where User.UserId == Id
                                             select User).Any(),
                              WatchLaterBool = (from User in Movie.UsersWatchLater
                                                where User.UserId == Id
                                                select User).Any()

                          }).ToList();
            }
            return Movies;
        }

        public List<MovieViewModel> GetMovieByStarCast(string[] StarCast)
        {
            List<MovieViewModel> Movies = new List<MovieViewModel>();
            List<StarCast> StarCastInfo = new List<StarCast>();
            var url = HttpContext.Current.Request.Url;
            var path = url.Scheme + "://" + url.Host + ":" + url.Port + "/Files/";
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                foreach (string StarCastName in StarCast)
                {
                    StarCastInfo.Add(db.StarCasts.FirstOrDefault(s => s.StarCastName.ToLower().Contains(StarCastName.ToLower().Trim())));
                }
                Movies = (from Cast in StarCastInfo
                          where Cast != null
                          from Movie in Cast.Movies
                          
                          select
                          new MovieViewModel
                          {
                              MovieId = Movie.MovieId,
                              MovieTitle = Movie.MovieTitle,
                              Duration = Movie.Duration,
                              ReleaseDate = Movie.ReleaseDate,
                              Plot = Movie.Plot,
                              Rating = (float?)(from Review in Movie.Reviews
                                                where Review != null
                                                select (float?)Review.Rating).Average(),
                              ThumbnailUrl = path + Movie.ThumbnailUrl,
                              VideoUrl = Movie.VideoUrl,
                              Hidden = Movie.Hidden,
                              Genres = (from Genre in Movie.Genres
                                        select new GenreViewModel
                                        {
                                            GenreId = Genre.GenreId,
                                            GenreName = Genre.GenreName
                                        }).ToList(),
                              StarCasts = (from Star in Movie.StarCasts
                                           select new StarCastViewModel
                                           {
                                               StarCastId = Star.StarCastId,
                                               StarCastName = Star.StarCastName
                                           }).ToList(),
                              HistoryBool = (from User in Movie.UsersWatchHistory
                                             where User.UserId == Id
                                             select User).Any(),
                              WatchLaterBool = (from User in Movie.UsersWatchLater
                                                where User.UserId == Id
                                                select User).Any()

                          }).ToList();


            }
            return Movies;
        }
    }
}
