using Database.Model;
using Database.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using ViewModel;

namespace DataAccessLayer
{
    public class UserOps
    {
        Context db = new Context();
        
        public List<MovieViewModel> GetMovies()
        {
            List<MovieViewModel> Movies = new List<MovieViewModel>();
            var url = HttpContext.Current.Request.Url;
            var path = url.Scheme + "://" + url.Host + ":" + url.Port + "/Files/";
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                Movies = (from Movie in db.Movies
                          where Movie.Hidden == false
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
                              WatchLaterBool =(from User in Movie.UsersWatchLater
                                               where User.UserId==Id
                                               select User).Any()

                          }).ToList();
               
            }
            return Movies;
        }

        public bool SetHistoryBool(MoviesInfo Movie,int Id)
        {
            foreach(UsersInfo User in Movie.UsersWatchHistory)
            {
                if (User.UserId == Id)
                {
                    return true;
                }
                
            }
            return false;
        }

        public List<MovieViewModel> GetHistory()
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
                          from User in Movie.UsersWatchHistory
                          where User.UserId == Id && Movie.Hidden == false
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

        public void PostHistory(int MovieId)
        {
            using (db)
            {
                var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

                //Filter specific claim    
                int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
                UsersInfo User = db.Users.Find(Id);
                MoviesInfo Movie = db.Movies.Find(MovieId);
                UsersInfo UserInfo = Movie.UsersWatchLater.FirstOrDefault(u => u.UserId == User.UserId);
                if (UserInfo != null)
                {

                    Movie.UsersWatchLater.Remove(User);
                }

                Movie.UsersWatchHistory.Add(User);
                db.SaveChanges();
            }
        }

        public void DeleteHistory(int MovieId)
        {
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                UsersInfo User = db.Users.Find(Id);
                MoviesInfo Movie = db.Movies.Find(MovieId);
                Movie.UsersWatchHistory.Remove(User);
                db.SaveChanges();
            }
        }

        public List<MovieViewModel> GetWatchLater(int id)
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
                          from User in Movie.UsersWatchLater
                          where User.UserId == id && Movie.Hidden == false
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

        public void PostWatchLater(int MovieId)
        {
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                UsersInfo User = db.Users.Find(Id);
                MoviesInfo Movie = db.Movies.Find(MovieId);
                // UsersInfo RefUser = Movie.UsersWatchLater.FirstOrDefault(u => u.UserId == User.UserId);
                //if (RefUser == null)
                //{
                //User.WatchLater.Add(Movie);
                  Movie.UsersWatchLater.Add(User);
                  db.SaveChanges();
                    //return true;
                //}
                //else
                //{
                //    return false;
                //}
            }
        }
        public void DeleteWatchLater( int MovieId)
        {
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                UsersInfo User = db.Users.Find(Id);
                MoviesInfo Movie = db.Movies.Find(MovieId);
                Movie.UsersWatchLater.Remove(User);
                db.SaveChanges();
            }
        }

        public List<NotificationViewModel> GetNotifications()
        {
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            List<NotificationViewModel> Notifications;
            using (db)
            {
                Notifications = (from Notification in db.Notifications
                                 where Notification.ReceiverId == Id && Notification.Movie.Hidden == false
                                 select new NotificationViewModel
                                 {
                                     ReciverId = Id,
                                     SenderId = Notification.Sender.UserId,
                                     MovieId = Notification.Movie.MovieId,
                                     MovieName = Notification.Movie.MovieTitle,
                                     SenderName = Notification.Sender.Name
                                 }).ToList();
            }
            return Notifications;
        }

        public void PostNotification(string Email,string MovieName)
        {
            MovieName = MovieName.Replace("%20", " ");
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (Context contextDb=new Context())
            {
                UsersInfo Sender = contextDb.Users.FirstOrDefault(u=>u.UserId==Id);
                UsersInfo Reciver = contextDb.Users.FirstOrDefault(u => u.Email.ToLower() == Email.ToLower());
                MoviesInfo Movie = contextDb.Movies.FirstOrDefault(m => m.MovieTitle.ToLower() == MovieName.ToLower());
                if (Reciver != null)
                {
                    Notifications Notify = contextDb.Notifications.FirstOrDefault(n => n.MovieId == Movie.MovieId && n.ReceiverId == Reciver.UserId && n.SenderId == Sender.UserId);
                    if (Notify == null)
                    {
                        Notifications NewNotification = new Notifications();
                        NewNotification.Sender = Sender;
                        NewNotification.Receiver = Reciver;
                        NewNotification.Movie = Movie;
                        contextDb.Notifications.Add(NewNotification);
                        contextDb.SaveChanges();
                    }
                }
            }
        }

        public void DeleteNotification(int SenderId, int MovieId)
        {
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                Notifications Notification = db.Notifications.Where(n => n.ReceiverId == Id && n.SenderId == SenderId && n.MovieId == MovieId).First();
                db.Notifications.Remove(Notification);
                db.SaveChanges();
            }
        }

        public void PostSearchHistory(int UserId,UserSearchHistory SearchHistory)
        {
            using (db)
            { 
                UsersInfo User = db.Users.Find(UserId);
                User.UserSearchHistories.Add(SearchHistory);
                db.SaveChanges();
            }
        }

        public List<ReviewViewModel> GetReviews()
        {
            List<ReviewViewModel> ReviewList;
            var url = HttpContext.Current.Request.Url;
            var path = url.Scheme + "://" + url.Host + ":" + url.Port + "/Files/Profiles/";
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                ReviewList = (from Review in db.Reviews
                              where Review.UserId == Id
                              select new ReviewViewModel
                              {
                                  MovieId = Review.MovieId,
                                  UserId = Review.UserId,
                                  Review = Review.Review,
                                  Rating = Review.Rating,
                                  UserName=Review.User.Name,
                                  MovieName= Review.Movie.MovieTitle,                               
                                  UserProfileUrl=path+Review.User.ProfilePhotoUrl
                              }).ToList();
            }
            return ReviewList;
        }

        public void PostReviews(Reviews NewReview)
        {
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                Reviews Review = db.Reviews.FirstOrDefault(r => r.MovieId == NewReview.MovieId && r.UserId == Id);
                if (Review == null)
                {
                    NewReview.UserId = Id;
                    db.Reviews.Add(NewReview);
                    db.SaveChanges();
                }
                else
                {
                    Review.Rating = NewReview.Rating;
                    Review.Review = NewReview.Review;
                    db.SaveChanges();
                }
            }
        }

        public UserViewModel GetProfile()
        {
            var url = HttpContext.Current.Request.Url;
            var path = url.Scheme + "://" + url.Host + ":" + url.Port + "/Files/Profiles/";
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();
            UserViewModel UserInfo;
            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                UserInfo = (from User in db.Users
                             where User.UserId == Id
                            select new UserViewModel
                             {
                                 UserId = User.UserId,
                                 Name = User.Name,
                                 DateOfBirth = User.DateOfBirth,
                                 Email = User.Email,
                                 Gender = User.Gender,
                                 ProfilePhotoUrl = path + User.ProfilePhotoUrl,
                                 BlockDateTime = User.BlockDateTime,
                                 BlockMessage = User.BlockMessage,
                                 PhoneNumber = User.PhoneNumber,
                                 RoleId = User.Role.RoleId,
                                 RoleName = User.Role.RoleName

                             }).ToList().FirstOrDefault();

            }
            return UserInfo;
        }
        public void PostProfileImg(string ImageName)
        {
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);

            //var handler = new JwtSecurityTokenHandler();
            using (db)
            {
                UsersInfo User = db.Users.Find(Id);
                User.ProfilePhotoUrl = ImageName;
                db.SaveChanges();
            }
        }

        public List<MovieViewModel> GetSuggested()
        {
            var url = HttpContext.Current.Request.Url;
            var path = url.Scheme + "://" + url.Host + ":" + url.Port + "/Files/";
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            List<MovieViewModel> Movies;
            using (db)
            {
                List<MoviesInfo> MovieList = (from Movie in db.Movies
                                              from User in Movie.UsersWatchHistory
                                              where User.UserId == Id
                                              select Movie).ToList();
                List<string> MovieListString = (from Movie in MovieList
                                                select Movie.MovieTitle).ToList();
                string[] Genres = (from Movie in MovieList
                                   from Genre in Movie.Genres
                                   select Genre.GenreName).Distinct().ToArray();
                string[] Casts = (from Movie in MovieList
                                  from Cast in Movie.StarCasts
                                  select Cast.StarCastName).Distinct().ToArray();
                List<string> NewMovieList = new List<string>();
                List<string> NewMovieGenre = new List<string>();
                List<string> NewMovieCast = new List<string>();
                foreach(string genre in Genres)
                {
                    Genres Genre = db.Genres.FirstOrDefault(g => g.GenreName.ToLower() == genre.ToLower());
                    foreach(MoviesInfo  Movie in Genre.Movies)
                    {
                        NewMovieGenre.Add(Movie.MovieTitle);
                    }
                }
                foreach(string cast in Casts)
                {
                    StarCast Cast = db.StarCasts.FirstOrDefault(s => s.StarCastName.ToLower() == cast.ToLower());
                    {
                        foreach(MoviesInfo Movie in Cast.Movies)
                        {
                            NewMovieCast.Add(Movie.MovieTitle);
                        }
                    }
                }
                NewMovieList = NewMovieGenre.Except(NewMovieCast).ToList();
                NewMovieList = NewMovieList.Concat(NewMovieCast.Except(NewMovieGenre)).ToList();
                NewMovieList = NewMovieList.Except(MovieListString).ToList();
                Movies = (from Movie in db.Movies
                          where NewMovieList.Contains(Movie.MovieTitle) && Movie.Hidden==false
                          select new MovieViewModel
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
