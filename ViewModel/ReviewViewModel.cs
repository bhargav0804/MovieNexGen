using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ViewModel
{
    public class ReviewViewModel
    {
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public string Review { get; set; }
        public float Rating { get; set; }
        public string MovieName { get; set; }
        public string UserName { get; set; }
        public string UserProfileUrl { get; set; }
    }
}