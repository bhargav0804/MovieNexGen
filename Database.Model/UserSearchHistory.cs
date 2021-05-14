using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Model
{
    public class UserSearchHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SearchId { get; set; }
        public ICollection<UsersInfo>  User { get; set; }
        [MaxLength(100)]
        public string Searchedtext { get; set; }
    }
}
