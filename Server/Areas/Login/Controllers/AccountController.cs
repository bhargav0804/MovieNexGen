using DataAccessLayer;
using Database.Model;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using ViewModel;
namespace Server.Areas.Login.Controllers
{
    public class AccountController : ApiController
    {

        public string GenerateToken(UserViewModel User)
        {
            // generate token that is valid for 7 days
            string key = "my_secret_key_12345"; //Secret key which will be used later during validation    
            var issuer = "http://mysite.com";  //normally this will be your site URL    

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //Create a List of Claims, Keep claims name short    
            var permClaims = new List<Claim>();
            permClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            permClaims.Add(new Claim("id", User.UserId.ToString()));
            permClaims.Add(new Claim("email", User.Email));
            permClaims.Add(new Claim("role", User.RoleName));

            //Create Security Token object by giving required parameters    
            var token = new JwtSecurityToken(issuer, //Issure    
                            issuer,  //Audience    
                            permClaims,
                            expires: DateTime.Now.AddDays(1),
                            signingCredentials: credentials);
            var jwt_token = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt_token;
        }

        #region Post Register
        [Route("api/account/register")]
        public IHttpActionResult PostRegister([FromBody]UsersInfo User)
        {
            try
            {
                AccountOps Account = new AccountOps();
                string Password = Account.HashPassword(User.Password);
                User.Password = Password;
                User.BlockDateTime = DateTime.Today;
                Account.Register(User);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Put Register
        [Route("api/account/register")]
        public IHttpActionResult PutRegister([FromBody]UsersInfo User)
        {
            
            try
            {
                AccountOps Account = new AccountOps();
                Account.UpdateUser(User);
                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return Ok();
        }
        #endregion

        #region Check Email Exist
        [Route("api/account/checkemail")]
        [HttpGet]
        public IHttpActionResult CheckEmail(string Email)
        {
            UserViewModel User = new UserViewModel();
            try
            {
                AccountOps Account = new AccountOps();
                User = Account.IsEmailExist(Email);
               
            }
            catch
            {
                return NotFound();
            }
            return Ok(User);
        }
        #endregion

        #region PutPassword
        [Route("api/account/password")]
        public IHttpActionResult PutPassword([FromBody]UserViewModel User)
        {
            try
            {
                AccountOps Account = new AccountOps();
                string Password = Account.HashPassword(User.Password);
                User.Password = Password;
                Account.UpdatePassword(User);
            }
            catch
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion


        #region Login
        [Route("api/account/login")]
        [HttpPost]
        public IHttpActionResult Login([FromBody] UserViewModel User)
        {
            string token=null;
            UserViewModel UserModel = new UserViewModel();
            try
            {
                AccountOps Account = new AccountOps();
                UserModel = Account.login(User);
                if (UserModel != null  && UserModel.BlockDateTime<=DateTime.Today)
                {
                    token = GenerateToken(UserModel);
                    return Ok(new { token = token, user = UserModel });
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message+" "+e.StackTrace);
            }
            return Ok(new { token = token, user = UserModel });
        }
        #endregion
    }
   
}
