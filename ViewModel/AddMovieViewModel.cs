using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class AddMovieViewModel
    {
        public string MovieTitle { get; set; }
        public int Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Plot { get; set; }
        public bool Hidden { get; set; }
        public string ThumbnailUrl { get; set; }
        public string VideoUrl { get; set; }
        public List<string> Genres { get; set; }
        public List<string> StarCasts { get; set; }
      
    }
}
