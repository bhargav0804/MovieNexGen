using Database.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database.Model;
using ViewModel;
using System.Web;
using System.Security.Claims;

namespace DataAccessLayer
{
    
    public class AdminOps
    {
        Context db = new Context();
        public List<MovieViewModel> GetMovies()
        {
            List<MovieViewModel> Movies;
            var url = HttpContext.Current.Request.Url;
            var path = url.Scheme + "://" + url.Host + ":" + url.Port + "/Files/";
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                Movies = (from Movie in db.Movies
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

        public List<UserViewModel> GetUsers()
        {
            List<UserViewModel> Users;
           
                using (db)
                {
                    Users = (from User in db.Users
                             where (User.Role.RoleName.ToLower() != "admin") && (User.BlockDateTime <= DateTime.Today)
                             select new UserViewModel
                             {
                                 UserId = User.UserId,
                                 Name = User.Name,
                                 DateOfBirth = User.DateOfBirth,
                                 Email = User.Email,
                                 Gender = User.Gender,
                                 ProfilePhotoUrl = User.ProfilePhotoUrl,
                                 BlockDateTime = User.BlockDateTime,
                                 BlockMessage = User.BlockMessage,
                                 PhoneNumber = User.PhoneNumber,
                                 RoleId = User.Role.RoleId,
                                 RoleName = User.Role.RoleName

                             }).ToList();
                }
            return Users;
            
        }

        public List<UserViewModel> GetBlockedUsers()
        {
            List<UserViewModel> Users;

            using (db)
            {
                Users = (from User in db.Users
                         where (User.Role.RoleName.ToLower() != "admin") && (User.BlockDateTime > DateTime.Today)
                         select new UserViewModel
                         {
                             UserId = User.UserId,
                             Name = User.Name,
                             DateOfBirth = User.DateOfBirth,
                             Email = User.Email,
                             Gender = User.Gender,
                             ProfilePhotoUrl = User.ProfilePhotoUrl,
                             BlockDateTime = User.BlockDateTime,
                             BlockMessage = User.BlockMessage,
                             PhoneNumber = User.PhoneNumber,
                             RoleId = User.Role.RoleId,
                             RoleName = User.Role.RoleName

                         }).ToList();
            }
            return Users;

        }

        public void UnblockUser(int Userid)
        {
            using (db)
            {
                UsersInfo User = db.Users.Find(Userid);
                User.BlockDateTime = DateTime.Today;
                db.SaveChanges();
            }
        }

        public void BlockUser(BlockUserViewModel UserModel)
        {
            using (db)
            {
                UsersInfo User = db.Users.Find(UserModel.UserId);
                User.BlockMessage = UserModel.Message;
                User.BlockDateTime = DateTime.Today.AddDays(UserModel.Days);
                db.SaveChanges();
            }
        }

        public void PostMovie(AddMovieViewModel NewMovie)
        {
            using (db)
            {
                MoviesInfo Movie = new MoviesInfo
                {
                    MovieTitle = NewMovie.MovieTitle,
                    Hidden = false,
                    Plot = NewMovie.Plot,
                    Rating = 2,
                    ReleaseDate = NewMovie.ReleaseDate,
                    ThumbnailUrl = NewMovie.ThumbnailUrl,
                    VideoUrl = NewMovie.VideoUrl,
                    Duration = NewMovie.Duration,

                };
                db.Movies.Add(Movie);
                db.SaveChanges();
                MoviesInfo NM = db.Movies.FirstOrDefault(x => x.MovieTitle == NewMovie.MovieTitle);
                foreach (string GenreItem in NewMovie.Genres)
                {
                    Genres Genre = db.Genres.FirstOrDefault(g => g.GenreName.Equals(GenreItem));
                    if (Genre != null)
                    {

                        //NM.Genres.Add(Genre);
                        Genre.Movies.Add(NM);

                        db.SaveChanges();

                    }



                }
                foreach (string ActorItem in NewMovie.StarCasts)
                {
                    StarCast Actor = db.StarCasts.FirstOrDefault(s => s.StarCastName.Equals(ActorItem));
                    if (Actor != null)
                    {
                        Actor.Movies.Add(NM);
                        db.SaveChanges();
                    }


                }
            }
        }

        public void PutMovie(int MovieId,AddMovieViewModel NewMovie)
        {
            using (db)
            {
                MoviesInfo Movie = db.Movies.Find(MovieId);

                Movie.MovieTitle = NewMovie.MovieTitle;
                Movie.Plot = NewMovie.Plot;
                Movie.ReleaseDate = NewMovie.ReleaseDate;
                if(NewMovie.ThumbnailUrl != "")
                {
                    Movie.ThumbnailUrl = NewMovie.ThumbnailUrl;
                }
                
                Movie.Duration = NewMovie.Duration;
               // db.SaveChanges();
                
                string[] PresentGenres = (from Genre in Movie.Genres select Genre.GenreName).ToArray();
                string[] GenreToBeAdded = NewMovie.Genres.Except(PresentGenres).ToArray();
                string[] GenreToBeRemoved = PresentGenres.Except(NewMovie.Genres).ToArray();

                foreach(string NewGenre in GenreToBeAdded)
                {
                    Genres Genre = db.Genres.FirstOrDefault(g => g.GenreName == NewGenre);
                    Movie.Genres.Add(Genre);
                    db.SaveChanges();
                }
                foreach (string NewGenre in GenreToBeRemoved)
                {
                    Genres Genre = db.Genres.FirstOrDefault(g => g.GenreName == NewGenre);
                    Movie.Genres.Remove(Genre);
                    db.SaveChanges();
                }
                string[] PresentStarCast = (from Star in Movie.StarCasts select Star.StarCastName).ToArray();
                string[] CastToBeAdded = NewMovie.StarCasts.Except(PresentStarCast).ToArray();
                string[] CastToBeRemoved = PresentStarCast.Except(NewMovie.StarCasts).ToArray();

                foreach (string NewCast in CastToBeAdded)
                {
                    StarCast Cast = db.StarCasts.FirstOrDefault(s => s.StarCastName == NewCast);
                    Movie.StarCasts.Add(Cast);
                    db.SaveChanges();
                }
                foreach (string NewCast in CastToBeRemoved)
                {
                    StarCast Cast = db.StarCasts.FirstOrDefault(s => s.StarCastName == NewCast);
                    Movie.StarCasts.Remove(Cast);
                    db.SaveChanges();
                }
                db.SaveChanges();
            }
        }

        public void DeleteMovie(int MovieId)
        {
            using (db)
            {
                MoviesInfo Movie = db.Movies.Find(MovieId);
                Movie.Hidden = (Movie.Hidden ? false : true);
                db.SaveChanges();
            }
        }

        public bool PostGenre(GenreViewModel GenreModel)
        {
            using (db)
            {
                Genres Genre = db.Genres.FirstOrDefault(g => g.GenreName.ToLower() == GenreModel.GenreName.ToLower().Trim());
                if (Genre == null)
                {
                    db.Genres.Add(new Genres { GenreName = GenreModel.GenreName });
                    db.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public void PutGenre(GenreViewModel GenreModel)
        {
            using (db)
            {
                Genres Genre = db.Genres.Find(GenreModel.GenreId);
                Genre.GenreName = GenreModel.GenreName.ToLower().Trim();
                db.SaveChanges();
            }
        }
        public void DeleteGenre(int GenreId)
        {
            using (db)
            {
                Genres Genre = db.Genres.Find(GenreId);
                db.Genres.Remove(Genre);
                db.SaveChanges();
            }
        }

        public bool PostStarCast(StarCastViewModel StarCastModel)
        {
            using (db)
            {
                StarCast StarCast = db.StarCasts.FirstOrDefault(s => s.StarCastName.ToLower() == StarCastModel.StarCastName.ToLower().Trim());
                if (StarCast == null)
                {

                    db.StarCasts.Add(new StarCast { StarCastName = StarCastModel.StarCastName });
                    db.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public void PutStarCast(StarCastViewModel StarCastModel)
        {
            using (db)
            {
                StarCast StarCast = db.StarCasts.Find(StarCastModel.StarCastId);
                StarCast.StarCastName = StarCastModel.StarCastName.ToLower().Trim();
                db.SaveChanges();
            }
        }

        public void DeleteStarCast(int StarCastId)
        {
            using (db)
            {
                StarCast StarCast = db.StarCasts.Find(StarCastId);
                db.StarCasts.Remove(StarCast);
                db.SaveChanges();
            }
        }
    }
}
