using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using Autofac;
using Autofac.Integration.Owin;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using PhoneBook.Core.Models;
using PhoneBook.Core.Util;
using PhoneBook.Domain.Abstract;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Core.Controllers
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private const string LocalLoginProvider = "Local";
        private IMainUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(IMainUserManager userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            UserManager = userManager;
            AccessTokenFormat = accessTokenFormat;
        }

        private IMainUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetAutofacLifetimeScope().Resolve<IMainUserManager>();
            }
            set { _userManager = value; }
        }

        private ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; }

        // GET api/Account/UserInfo
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("UserInfo")]
        public UserInfoViewModel GetUserInfo()
        {
            var externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            return new UserInfoViewModel
            {
                Email = User.Identity.GetUserName(),
                HasRegistered = externalLogin == null,
                LoginProvider = externalLogin?.LoginProvider
            };
        }

        // GET api/Account/AllUserInfo
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("AllUserInfo")]
        public async Task<PersonalUserInfoViewModer> GetAllUserInfo()
        {
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            var viewUser = new PersonalUserInfoViewModer
            {
                FirstName = user.FirstName,
                MiddleName = user.MiddleName,
                LastName = user.LastName,
                PositionInCompany = user.PositionInCompany,
                PhonePrivate = user.PhonePrivate,
                PhoneWork = user.PhoneWork,
                Notes = user.Notes,
                Boss = user.Boss,
                NotesForBoss = user.NotesForBoss,
                HolidayTimeStart = user.HolidayTimeStart,
                HolidayTimeEnd = user.HolidayTimeEnd,
                PathToPhoto = user.PathToPhoto,
                PathToTmbOfPhoto = user.PathToTmbOfPhoto,
                Claims = user.Claims
            };
            return viewUser;
        }

        // GET api/Account/SearchUsers
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("SearchUsers")]
        [HttpGet]
        [AllowAnonymous]
        public IQueryable SearchUsers(string searchData)
        {
            var users = UserManager.FindByFirstName(searchData);
            var viewsUser = users.Select(user=> new
            {
                Email = user.Email,
                FirstName = user.FirstName,
                MiddleName = user.MiddleName,
                LastName = user.LastName,
                PositionInCompany = user.PositionInCompany,
                PhonePrivate = user.PhonePrivate,
                PhoneWork = user.PhoneWork,
                Notes = user.Notes,
                Boss = user.Boss,
                PathToPhoto = user.PathToPhoto,
                PathToTmbOfPhoto = user.PathToTmbOfPhoto
            });

            return viewsUser;
        }

        // POST api/Account/UpdateAllUserInfo
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("UpdateAllUserInfo")]
        public async Task<IHttpActionResult> UpdateAllUserInfo(PersonalUserInfoViewModer updatedUser)
        {
            if (!ModelState.IsValid) return BadRequest("Wrong model");
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (updatedUser.Email != null)
                user.Email = updatedUser.Email;
            if (updatedUser.FirstName != null)
                user.FirstName = updatedUser.FirstName;
            if (updatedUser.MiddleName != null)
                user.MiddleName = updatedUser.MiddleName;
            if (updatedUser.LastName != null)
                user.LastName = updatedUser.LastName;
            if (updatedUser.PositionInCompany != null)
                user.PositionInCompany = updatedUser.PositionInCompany;
            if (updatedUser.PhonePrivate != null)
                user.PhonePrivate = updatedUser.PhonePrivate;
            if (updatedUser.PhoneWork != null)
                user.PhoneWork = updatedUser.PhoneWork;
            if (updatedUser.Notes != null)
                user.Notes = updatedUser.Notes;
            if (updatedUser.NotesForBoss != null)
                user.Notes = updatedUser.NotesForBoss;
            var response = await UserManager.UpdateAsync(user);
            return response.Succeeded ? Ok(new { Msg = response.Errors, IsOk = response.Succeeded }) : GetErrorResult(response);
        }



        // POST api/Account/UpdateAllUserInfoByAdmin
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("UpdateAllUserInfoByAdmin")]
        public async Task<IHttpActionResult> UpdateAllUserInfoByAdmin(PersonalUserInfoViewModer updatedUser)
        {
            var d = updatedUser;
            var dbg = "dbg";
            if (!ModelState.IsValid) return BadRequest("Wrong model");
            var user = await UserManager.FindByEmailAsync(updatedUser.Email); 
            if (updatedUser.Email != null)
                user.Email = updatedUser.Email;
            if (updatedUser.FirstName != null)
                user.FirstName = updatedUser.FirstName;
            if (updatedUser.MiddleName != null)
                user.MiddleName = updatedUser.MiddleName;
            if (updatedUser.LastName != null)
                user.LastName = updatedUser.LastName;
            if (updatedUser.PositionInCompany != null)
                user.PositionInCompany = updatedUser.PositionInCompany;
            if (updatedUser.PhonePrivate != null)
                user.PhonePrivate = updatedUser.PhonePrivate;
            if (updatedUser.PhoneWork != null)
                user.PhoneWork = updatedUser.PhoneWork;
            if (updatedUser.Notes != null)
                user.Notes = updatedUser.Notes;
            if (updatedUser.NotesForBoss != null)
                user.NotesForBoss = updatedUser.NotesForBoss;

            if (updatedUser.HolidayTimeStart != null)
                user.HolidayTimeStart = updatedUser.HolidayTimeStart;

            if (updatedUser.HolidayTimeEnd != null)
                user.HolidayTimeEnd = updatedUser.HolidayTimeEnd;

            var response = await UserManager.UpdateAsync(user);
            return response.Succeeded ? Ok(new { Msg = response.Errors, IsOk = response.Succeeded }) : GetErrorResult(response);
        }

        [Route("Upload")]
        // POST api/Account/Upload
        [MimeMultipart]
        public async Task<IHttpActionResult> Upload()
        {
            var uploadPath = HttpContext.Current.Server.MapPath("~/Content/ProfileImages");

            var multipartFormDataStreamProvider = new UploadMultipartFormProvider(uploadPath);
 
            // Read the MIME multipart asynchronously 
            await Request.Content.ReadAsMultipartAsync(multipartFormDataStreamProvider);
 
            var localFileName = multipartFormDataStreamProvider
                .FileData.Select(multiPartData => multiPartData.LocalFileName).FirstOrDefault();
            var fileName = Path.GetFileName(localFileName);
            var tmbPath = $"{uploadPath}/tmbs/{fileName}";
            ImagesHelper.ToTmb(localFileName,tmbPath);

            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

            user.PathToPhoto = $"/Content/ProfileImages/{fileName}";
            user.PathToTmbOfPhoto = $"/Content/ProfileImages/tmbs/{fileName}";

            var response = await UserManager.UpdateAsync(user);
            return response.Succeeded ? Ok(new { Msg = response.Errors, IsOk = response.Succeeded }) : GetErrorResult(response);
        }

        // POST api/Account/Logout
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return Ok();
        }

        // GET api/Account/ManageInfo?returnUrl=%2F&generateState=true
        [Route("ManageInfo")]
        public async Task<ManageInfoViewModel> GetManageInfo(string returnUrl, bool generateState = false)
        {
            IdentityUser user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

            if (user == null)
            {
                return null;
            }

            var logins = user.Logins.Select(linkedAccount => new UserLoginInfoViewModel
            {
                LoginProvider = linkedAccount.LoginProvider,
                ProviderKey = linkedAccount.ProviderKey
            }).ToList();

            if (user.PasswordHash != null)
            {
                logins.Add(new UserLoginInfoViewModel
                {
                    LoginProvider = LocalLoginProvider,
                    ProviderKey = user.UserName
                });
            }

            return new ManageInfoViewModel
            {
                LocalLoginProvider = LocalLoginProvider,
                Email = user.UserName,
                Logins = logins,
                ExternalLoginProviders = GetExternalLogins(returnUrl, generateState)
            };
        }

        // POST api/Account/ChangePassword
        [Route("ChangePassword")]
        [HttpPost]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword,
                model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok(result);
        }

        // POST api/Account/SetPassword
        [Route("SetPassword")]
        public async Task<IHttpActionResult> SetPassword(SetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await UserManager.AddPasswordAsync(User.Identity.GetUserId(), model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/AddExternalLogin
        [Route("AddExternalLogin")]
        public async Task<IHttpActionResult> AddExternalLogin(AddExternalLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

            var ticket = AccessTokenFormat.Unprotect(model.ExternalAccessToken);

            if (ticket?.Identity == null ||
                (ticket.Properties?.ExpiresUtc != null && ticket.Properties.ExpiresUtc.Value < DateTimeOffset.UtcNow))
            {
                return BadRequest("External login failure.");
            }

            var externalData = ExternalLoginData.FromIdentity(ticket.Identity);

            if (externalData == null)
            {
                return BadRequest("The external login is already associated with an account.");
            }

            var result = await UserManager.AddLoginAsync(User.Identity.GetUserId(),
                new UserLoginInfo(externalData.LoginProvider, externalData.ProviderKey));

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/RemoveLogin
        [Route("RemoveLogin")]
        public async Task<IHttpActionResult> RemoveLogin(RemoveLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result;

            if (model.LoginProvider == LocalLoginProvider)
            {
                result = await UserManager.RemovePasswordAsync(User.Identity.GetUserId());
            }
            else
            {
                result = await UserManager.RemoveLoginAsync(User.Identity.GetUserId(),
                    new UserLoginInfo(model.LoginProvider, model.ProviderKey));
            }

            return !result.Succeeded ? GetErrorResult(result) : Ok();
        }

        // GET api/Account/ExternalLogin
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [Route("ExternalLogin", Name = "ExternalLogin")]
        public async Task<IHttpActionResult> GetExternalLogin(string provider, string error = null)
        {
            if (error != null)
            {
                return Redirect(Url.Content("~/") + "#error=" + Uri.EscapeDataString(error));
            }

            if (!User.Identity.IsAuthenticated)
            {
                //return new ChallengeResult(provider, this);
            }

            var externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            if (externalLogin == null)
            {
                return InternalServerError();
            }

            if (externalLogin.LoginProvider != provider)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                //return new ChallengeResult(provider, this);
            }

            var user = await UserManager.FindAsync(new UserLoginInfo(externalLogin.LoginProvider,
                externalLogin.ProviderKey));

            var hasRegistered = user != null;

            if (hasRegistered)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

                var oAuthIdentity = await user.GenerateUserIdentityAsync(UserManager,
                    OAuthDefaults.AuthenticationType);
                var cookieIdentity = await user.GenerateUserIdentityAsync(UserManager,
                    CookieAuthenticationDefaults.AuthenticationType);

                var properties = ApplicationOAuthProvider.CreateProperties(user.UserName);
                Authentication.SignIn(properties, oAuthIdentity, cookieIdentity);
            }
            else
            {
                var claims = externalLogin.GetClaims();
                var identity = new ClaimsIdentity(claims, OAuthDefaults.AuthenticationType);
                Authentication.SignIn(identity);
            }

            return Ok();
        }

        // GET api/Account/ExternalLogins?returnUrl=%2F&generateState=true
        [AllowAnonymous]
        [Route("ExternalLogins")]
        public IEnumerable<ExternalLoginViewModel> GetExternalLogins(string returnUrl, bool generateState = false)
        {
            var descriptions = Authentication.GetExternalAuthenticationTypes();

            string state;

            if (generateState)
            {
                const int strengthInBits = 256;
                state = RandomOAuthStateGenerator.Generate(strengthInBits);
            }
            else
            {
                state = null;
            }

            return descriptions.Select(description => new ExternalLoginViewModel
            {
                Name = description.Caption,
                Url = Url.Route("ExternalLogin", new
                {
                    provider = description.AuthenticationType,
                    response_type = "token",
                    client_id = Startup.PublicClientId,
                    redirect_uri = new Uri(Request.RequestUri, returnUrl).AbsoluteUri,
                    state
                }),
                State = state
            }).ToList();
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(RegisterBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User {UserName = model.Email, Email = model.Email, Password = model.Password};

            var result = await UserManager.CreateAsync(user);

            return !result.Succeeded ? GetErrorResult(result) : Ok();
        }

        // POST api/Account/RegisterExternal
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("RegisterExternal")]
        public async Task<IHttpActionResult> RegisterExternal(RegisterExternalBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var info = await Authentication.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return InternalServerError();
            }

            var user = new User {UserName = model.Email, Email = model.Email};

            var result = await UserManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            result = await UserManager.AddLoginAsync(user.Id, info.Login);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }
            return Ok();
        }

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing && _userManager != null)
        //    {
        //        _userManager.Dispose();
        //        _userManager = null;
        //    }

        //    base.Dispose(disposing);
        //}

        #region Helpers

        private IAuthenticationManager Authentication => Request.GetOwinContext().Authentication;

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private class ExternalLoginData
        {
            public string LoginProvider { get; private set; }
            public string ProviderKey { get; private set; }
            public string UserName { get; set; }

            public IEnumerable<Claim> GetClaims()
            {
                IList<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider));

                if (UserName != null)
                {
                    claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
                }

                return claims;
            }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                var providerKeyClaim = identity?.FindFirst(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(providerKeyClaim?.Issuer) || string.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name)
                };
            }
        }

        private static class RandomOAuthStateGenerator
        {
            private static readonly RandomNumberGenerator Random = new RNGCryptoServiceProvider();

            public static string Generate(int strengthInBits)
            {
                const int bitsPerByte = 8;

                if (strengthInBits%bitsPerByte != 0)
                {
                    throw new ArgumentException("strengthInBits must be evenly divisible by 8.", nameof(strengthInBits));
                }

                var strengthInBytes = strengthInBits/bitsPerByte;

                var data = new byte[strengthInBytes];
                Random.GetBytes(data);
                return HttpServerUtility.UrlTokenEncode(data);
            }
        }

        #endregion
    }
}