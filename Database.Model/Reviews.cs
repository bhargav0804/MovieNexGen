using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Model
{
    public class Reviews
    {
        //[Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //public int ReviewId { get; set; }
        [Key, Column(Order = 0)]
        public int UserId { get; set; }
        public UsersInfo User { get; set; }

        [Key, Column(Order = 1)]
        public int MovieId { get; set; }
        public MoviesInfo Movie { get; set; }
        public string Review { get; set; }
        [Required]
        [Range(0.0f,5.0f)]
        public float Rating { get; set; }
    }
}
