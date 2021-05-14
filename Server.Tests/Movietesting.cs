using Database.Model;
using NUnit.Framework;
using Server.Areas.Movie.Controllers;
namespace Server.Tests
{
    [TestFixture]
    class Movietesting
    {
        [TestCase]
        public void GetMovieGenreTest()
        {
            string Count;
            MovieController test = new MovieController();
            Count = test.GetGenre().ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void GetMovieStarCastTest()
        {
            string Count;
            MovieController test = new MovieController();
            Count = test.GetStarCast().ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void GetMovieReviewTest()
        {
            string Count;
            MovieController test = new MovieController();
            Count = test.GetReview(1).ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void GetMoviebyIdTest()
        {
            string Count;
            MovieController test = new MovieController();
            Count = test.GetMovie(1).ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void GetMoviebyGenreTest()
        {
            string Count;
            MovieController test = new MovieController();
            Count = test.GetMovie("").ToString();
            Assert.IsNotNull(Count);
        }
    }
}