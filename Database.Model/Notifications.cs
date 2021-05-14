using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Model
{
    public class Notifications
    {
        //[Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //public int NotificationId { get; set; }
        //[Key,Column(Order =0)]
        //public UsersInfo  Sender { get; set; }
        //[Key,Column(Order =1)]
        //public UsersInfo Receiver { get; set; }
        //[Key,Column(Order =2)]
        //public MoviesInfo Movie { get; set; }
        //public bool MarkAsRead { get; set; }
        [ForeignKey("Sender")]
        public int SenderId { get; set; }
        public UsersInfo Sender { get; set; }
        [ForeignKey("Receiver")]
        public int ReceiverId { get; set; }
        public UsersInfo Receiver { get; set; }
        [ForeignKey("Movie")]
        public int MovieId { get; set; }
        public MoviesInfo Movie { get; set; }
        public bool MarkAsRead { get; set; }

    }
}
