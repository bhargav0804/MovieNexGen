using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Model
{
    public class MoviesInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MovieId { get; set; }
        [Required]
        [MaxLength(500)]
        public string MovieTitle { get; set; }
        [Required]
        public int Duration { get; set; }
        [Required]
        public DateTime ReleaseDate { get; set; }
        [Required]
        [Range(0.0f, 5.0f)]
        public float Rating { get; set; }
        [Required]
        public string Plot { get; set; }
        public bool Hidden { get; set; }
        public string ThumbnailUrl { get; set; }
        public string VideoUrl { get; set; }
        public virtual ICollection<Reviews> Reviews { get; set; }
        public virtual ICollection<Genres> Genres { get; set; }
        public virtual ICollection<StarCast> StarCasts { get; set; }
        public virtual ICollection<Notifications> Notifications { get; set; }
        [InverseProperty("WatchHistory")]
        public virtual ICollection<UsersInfo> UsersWatchHistory { get; set; }
        [InverseProperty("WatchLater")]
        public virtual ICollection<UsersInfo> UsersWatchLater { get; set; }

    }
}
