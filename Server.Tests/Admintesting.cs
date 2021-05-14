
using NUnit.Framework;
using Server.Areas.Admin.Controllers;
namespace Server.Tests
{
    [TestFixture]
    class Admintesting
    {
        [TestCase]
        public void GetAllMoviesTest()
        {
            string Count;
            AdminController test = new AdminController();
            Count = test.GetMovies().ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void GetAllUsersTest()
        {
            string Count;
            AdminController test = new AdminController();
            Count = test.GetUsers().ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void GetBlockedUsersTest()
        {
            string Count;
            AdminController test = new AdminController();
            Count = test.GetBlockedUsers().ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void UnBlockUserTest()
        {
            string Count;
            AdminController test = new AdminController();
            Count = test.UnBlock(1).ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void PostMovieTest()
        {
            string Count;
            AdminController test = new AdminController();
            Count = test.PostMovie().ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void PutMovieTest()
        {
            string Count;
            AdminController test = new AdminController();
            Count = test.PutMovie().ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void DeleteMovieTest()
        {
            string Count;
            AdminController test = new AdminController();
            Count = test.DeleteMovie(1).ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void DeleteGenreTest()
        {
            string Count;
            AdminController test = new AdminController();
            Count = test.DeleteGenre(1).ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void DeleteStarCastTest()
        {
            string Count;
            AdminController test = new AdminController();
            Count = test.DeleteStarCast(1).ToString();
            Assert.IsNotNull(Count);
        }
    }
}