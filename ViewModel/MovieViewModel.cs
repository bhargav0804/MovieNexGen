using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ViewModel
{
    public class MovieViewModel
    {
        public int MovieId { get; set; }
        public string MovieTitle { get; set; }
        public int Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public float? Rating{ get; set; }
        public string Plot { get; set; }
        public bool Hidden { get; set; }
        public string ThumbnailUrl { get; set; }
        public string VideoUrl { get; set; }
        public bool WatchLaterBool { get; set; }
        public bool HistoryBool { get; set; }
        public List<GenreViewModel> Genres { get; set; }
        public List<StarCastViewModel> StarCasts { get; set; }
    }
}