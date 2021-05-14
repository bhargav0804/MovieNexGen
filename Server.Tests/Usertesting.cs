
using Database.Model;
using NUnit.Framework;
using Server.Areas.User.Controllers;
namespace Server.Tests
{
    [TestFixture]
    class Usertesting
    {
        Reviews reviewobj = new Reviews();
        string rev = "";
        [TestCase]
        public void GetAllMovieTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.GetMovies().ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void GetHistoryTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.History().ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void PostHistoryTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.History(1).ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void DeleteHistoryTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.DeleteHistory(1).ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void GetWatchLaterTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.WatchLater(1).ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void PostWatchLaterTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.PostWatchLater(1).ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void DeleteWatchLaterTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.WatchLater(1).ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void GetNotificationTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.Notification().ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void DeleteNotificationTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.Notification(1, 1).ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void GetReviewTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.GetReview().ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void GetUserProfileTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.GetProfile().ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void ShareMovieTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.ShareMovie("", "").ToString();
            Assert.IsNotNull(Count);
        }
        [TestCase]
        public void GetSuggestedTest()
        {
            string Count;
            UserController test = new UserController();
            Count = test.GetSuggested().ToString();
            Assert.IsNotNull(Count);
        }
    }
}