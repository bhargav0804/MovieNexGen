using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ViewModel
{
    public class NotificationViewModel
    {
        public int ReciverId { get; set; }
        public int SenderId { get; set; }
        public int MovieId { get; set; }
        public string SenderName { get; set; }
        public string MovieName { get; set; }
    }
}