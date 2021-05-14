using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Model
{
    public class StarCast
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StarCastId { get; set; }
        [Required]
        [MaxLength(100)]
        public string StarCastName { get; set; }

        public virtual ICollection<MoviesInfo> Movies { get; set; }
    }
}
