using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics.CodeAnalysis;

namespace Database.Model
{
    public class UsersInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [MaxLength(10)]
        [MinLength(10)]
        public string PhoneNumber { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Gender { get; set; }

        public Roles Role { get; set; }
        public string ProfilePhotoUrl { get; set; }
        public string BlockMessage { get; set; }
        public DateTime BlockDateTime { get; set; }
        //[InverseProperty("Sender")]
        //public Notifications NotificationSender { get; set; }
        //[InverseProperty("Receiver")]
        //public Notifications NotificationReceiver { get; set; }

        public virtual ICollection<UserSearchHistory> UserSearchHistories { get; set; }
        public virtual ICollection<Reviews> Reviews { get; set; }
        public ICollection<MoviesInfo> WatchHistory { get; set; }
        public ICollection<MoviesInfo> WatchLater { get; set; }
    }
}
