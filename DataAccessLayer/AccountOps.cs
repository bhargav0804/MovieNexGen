using Database.Model;
using Database.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using ViewModel;

namespace DataAccessLayer
{
    public class AccountOps
    {
        Context db = new Context();
        #region Hash Password
        public  string HashPassword(string Password)
        {
            var Provider = new SHA1CryptoServiceProvider();
            var Encoding = new UnicodeEncoding();
            byte[] Encrypted = Provider.ComputeHash(Encoding.GetBytes(Password));
            return Convert.ToBase64String(Encrypted);
        }
        #endregion
        #region Email Exist or Not
        public  UserViewModel IsEmailExist(string Email)
        {
            UsersInfo Result=new UsersInfo();
            UserViewModel UserModel = new UserViewModel();
            using (db)
            {
                 Result = db.Users.FirstOrDefault(u => u.Email.Equals(Email));
                if (Result != null)
                {
                    UserModel = new UserViewModel
                    {
                        Email = Result.Email,
                        DateOfBirth = Result.DateOfBirth,
                        Gender = Result.Gender,
                        BlockDateTime = Result.BlockDateTime,
                        Name = Result.Name,
                        BlockMessage = Result.BlockMessage,
                    };
                }
               
            }

            return UserModel;
        }
        #endregion

        #region Register User
        public void Register(UsersInfo User)
        {
            
            using (db)
            {
                Roles Role = db.Roles.FirstOrDefault(r => r.RoleName.ToLower() == "user");
                db.Users.Add(new UsersInfo {
                Name=User.Name,
                Email=User.Email,
                Gender=User.Gender,
                DateOfBirth=User.DateOfBirth,
                Password=User.Password,
                PhoneNumber=User.PhoneNumber,
                BlockDateTime=User.BlockDateTime,
                Role=Role,
                ProfilePhotoUrl=User.ProfilePhotoUrl
                
                });
                db.SaveChanges();
            }
        }
        #endregion

        #region Update user
        public void UpdateUser(UsersInfo NewUser)
        {
            var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

            //Filter specific claim    
            int Id = Convert.ToInt32(claims?.FirstOrDefault(x => x.Type.Equals("id", StringComparison.OrdinalIgnoreCase))?.Value);
            using (db)
            {
                UsersInfo User = db.Users.Find(Id);
                User.Name = NewUser.Name;
                User.PhoneNumber = NewUser.PhoneNumber;
                db.SaveChanges();
            }
        }
        #endregion

        #region Update password
        public void UpdatePassword(UserViewModel User)
        {
            using (db)
            {
                UsersInfo UserItem = db.Users.FirstOrDefault(u => u.Email == User.Email);
                UserItem.Password = User.Password;
                db.SaveChanges();
            }
        }
        #endregion

        #region Login 
        public UserViewModel login(UserViewModel LoginUser)
        {
            UserViewModel UserModel = new UserViewModel();
            var url = HttpContext.Current.Request.Url;
            var path = url.Scheme + "://" + url.Host + ":" + url.Port + "/Files/Profiles";
            string Password = HashPassword(LoginUser.Password);
            using (db)
            {
                UserModel = (from User in db.Users
                            where  User.Email==LoginUser.Email && User.Password==Password
                            select new UserViewModel
                            {
                                UserId = User.UserId,
                                Name = User.Name,
                                DateOfBirth = User.DateOfBirth,
                                Email = User.Email,
                                Gender = User.Gender,
                                ProfilePhotoUrl =path+ User.ProfilePhotoUrl,
                                BlockDateTime = User.BlockDateTime,
                                BlockMessage = User.BlockMessage,
                                PhoneNumber = User.PhoneNumber,
                                RoleId = User.Role.RoleId,
                                RoleName = User.Role.RoleName

                            }).ToList().FirstOrDefault();
                //if (UserModel != null)
                //{
                //    if (UserInfo.BlockDateTime <= DateTime.Today)
                //    {
                //        UserModel.Name = UserInfo.Name;
                //        UserModel.PhoneNumber = UserInfo.PhoneNumber;
                //        UserModel.ProfilePhotoUrl = UserInfo.ProfilePhotoUrl;
                //        UserModel.UserId = UserInfo.UserId;
                //        UserModel.Email = UserInfo.Email;
                //        UserModel.DateOfBirth = UserInfo.DateOfBirth;
                //        UserModel.Gender = UserInfo.Gender;
                //        UserModel.BlockDateTime = UserInfo.BlockDateTime;
                //        UserModel.RoleName = UserInfo.Role.RoleName.ToString();
                //    }
                //    else
                //    {
                //        UserModel.UserId = UserInfo.UserId;
                //        UserModel.BlockMessage = UserInfo.BlockMessage;
                //        UserModel.BlockDateTime = UserInfo.BlockDateTime;
                //    }


                //}
            }
            return UserModel;
        }
        #endregion

      
    }
}
