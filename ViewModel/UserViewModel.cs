using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ViewModel
{
    public class UserViewModel
    {
        public Nullable<int> UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public Nullable<int> RoleId { get; set; }
        public string RoleName { get; set; }
        public string ProfilePhotoUrl { get; set; }
        public string BlockMessage { get; set; }
        public string Password { get; set; }
        public Nullable<DateTime> BlockDateTime { get; set; }
    }
}